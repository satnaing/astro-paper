import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const calendarIconSvg = `
  <svg class="inline-block size-6 min-w-[1.375rem]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
    <path d="M16 3v4" />
    <path d="M8 3v4" />
    <path d="M4 11h16" />
    <path d="M7 14h.013" />
    <path d="M10.01 14h.005" />
    <path d="M13.01 14h.005" />
    <path d="M16.015 14h.005" />
    <path d="M13.015 17h.005" />
    <path d="M7.01 17h.005" />
    <path d="M10.01 17h.005" />
  </svg>`;

function createFeedCardHTML(item, siteTimezone, fallbackOgImageGlobal) {
  let displayDate = "";
  let displayTime = "";
  let isoTimestamp = "";

  if (item.published && typeof item.published === 'string') {
    const parts = item.published.split(" | ");
    displayDate = parts[0]; // e.g., "26 May, 2025"
    if (parts.length > 1) {
      displayTime = parts[1]; // e.g., "01:20 PM"
    }

    // Construct a string that dayjs is likely to parse for the ISO timestamp
    // Example: "26 May 2025 01:20 PM" (remove comma from date part for better parsing)
    let parsableString = displayDate.replace(/,/g, ''); // "26 May 2025"
    if (displayTime) {
      parsableString += ` ${displayTime}`; // "26 May 2025 01:20 PM"
    }
    
    try {
      // @ts-ignore
      const parsed = dayjs(parsableString, ["D MMM YYYY hh:mm A", "D MMM YYYY h:mm A", "D MMM YYYY"], true); // Added true for strict parsing
      if (parsed.isValid()) {
        // @ts-ignore
        isoTimestamp = parsed.tz(siteTimezone || 'UTC').toISOString();
      } else {
        // Fallback for isoTimestamp if strict parsing fails
        // Try parsing without format string, relying on dayjs's flexibility
        // @ts-ignore
        const lessStrictParse = dayjs(item.published.replace(" | ", " "));
        if(lessStrictParse.isValid()){
          // @ts-ignore
          isoTimestamp = lessStrictParse.tz(siteTimezone || "UTC").toISOString();
        } else {
          console.warn("Failed to parse date for ISO timestamp:", item.published);
        }
      }
    } catch (e) {
      console.warn("Exception during date parsing for ISO timestamp:", item.published, e);
    }
  } else {
    displayDate = "Date not available";
  }

  const description = `By ${item.blog_name}`;
  const shortDescription = description.length > 40 ? description.substring(0, 40) + "..." : description;

  const defaultImageClass = "w-[76px] sm:w-[81.78px] h-auto object-cover rounded-md aspect-square group-hover:opacity-90 transition-opacity duration-300";

  let imgSrc = item.avatar || '';
  if ((!imgSrc || imgSrc.trim() === "") && fallbackOgImageGlobal) {
    imgSrc = fallbackOgImageGlobal;
  }
  
  const onerrorHandler = fallbackOgImageGlobal ? `this.onerror=null; this.src='${fallbackOgImageGlobal}';` : '';

  return `
    <li class="my-6 flex flex-row gap-6 items-start">
      ${imgSrc ? `
        <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="shrink-0 mx-auto my-auto">
          <img
            src="${imgSrc}"
            alt="${item.title}"
            class="${defaultImageClass}" 
            loading="lazy"
            onerror="${onerrorHandler}"
          />
        </a>
      ` : ''}
      <div class="flex-grow">
        <a
          href="${item.link}" target="_blank" rel="noopener noreferrer"
          class="inline-block text-lg font-medium text-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
        >
          <h3 class="text-lg font-medium decoration-dashed hover:underline">${item.title}</h3>
        </a>
        <div class="flex items-end space-x-2 opacity-80 mt-1">
          ${calendarIconSvg}
          <span class="sr-only">Published:</span>
          <span class="text-sm italic">
            <time datetime="${isoTimestamp}">${displayDate}</time>
            ${displayTime ? `
            <span aria-hidden="true"> | </span>
            <span class="sr-only">&nbsp;at&nbsp;</span>
            <span class="text-nowrap">${displayTime}</span>
            ` : ''}
          </span>
        </div>
        <p class="mt-2 text-sm text-gray-700 dark:text-gray-300 hidden sm:block">
          ${shortDescription}
        </p>
      </div>
    </li>
  `;
}

export async function initFeeds(siteTimezone, fallbackOgImageGlobal, initialItemCount, itemsPerPage, dataSourceUrl) {
  const feedsListElement = document.getElementById('feeds-list');
  const loadMoreTrigger = document.getElementById('load-more-trigger');
  const loadingContainer = document.getElementById('feeds-loading');
  const errorContainer = document.getElementById('feeds-error');
  const noContentContainer = document.getElementById('feeds-no-content');

  if (!feedsListElement || !loadingContainer || !errorContainer || !noContentContainer) {
    console.error("Required DOM elements for feeds are missing.");
    return;
  }

  let allFeeds = [];
  let currentIndex = 0; // Start with 0 as initial items will also be loaded by loadMoreItems
  let observer;

  async function fetchFeeds() {
    try {
      const response = await fetch(dataSourceUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      allFeeds = data.items || []; // Ensure allFeeds is an array
      loadingContainer.classList.add('hidden');

      if (allFeeds.length === 0) {
        noContentContainer.classList.remove('hidden');
        if (loadMoreTrigger) loadMoreTrigger.style.display = 'none';
        return;
      }
      
      // Initial load of items
      loadMoreItems(initialItemCount); 

      // Setup Intersection Observer if there are more items than initially shown
      if (loadMoreTrigger && allFeeds.length > initialItemCount) {
        loadMoreTrigger.style.display = 'block'; // Show trigger if more items exist
        observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            loadMoreItems(itemsPerPage);
          }
        }, { threshold: 0.1 });
        observer.observe(loadMoreTrigger);
      } else if (loadMoreTrigger) {
        loadMoreTrigger.style.display = 'none';
      }

    } catch (e) {
      console.error("Failed to fetch feeds:", e);
      loadingContainer.classList.add('hidden');
      errorContainer.classList.remove('hidden');
      if (loadMoreTrigger) loadMoreTrigger.style.display = 'none';
    }
  }

  function loadMoreItems(count) {
    if (!feedsListElement) {
        return;
    }
    const itemsToLoad = allFeeds.slice(currentIndex, currentIndex + count);

    if (itemsToLoad.length === 0) {
      if (loadMoreTrigger) loadMoreTrigger.style.display = 'none'; 
      if (observer) {
        observer.disconnect();
      }
      // If it's the initial load and no items, noContentContainer would have been shown by fetchFeeds
      return;
    }

    let newItemsHTML = '';
    itemsToLoad.forEach(item => {
      newItemsHTML += createFeedCardHTML(item, siteTimezone, fallbackOgImageGlobal);
    });
    feedsListElement.insertAdjacentHTML('beforeend', newItemsHTML);
    currentIndex += itemsToLoad.length;

    if (currentIndex >= allFeeds.length) {
        if (loadMoreTrigger) loadMoreTrigger.style.display = 'none';
        if(observer) {
            observer.disconnect();
        }
    }
  }

  await fetchFeeds();
} 