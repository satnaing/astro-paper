import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// 从 getPath 函数复制的路径生成逻辑 - 更新为简化URL结构
function getPostPath(id) {
  // Making sure `id` does not contain the directory
  const blogId = id.split("/");
  const slug = blogId.length > 0 ? blogId.slice(-1)[0] : id;

  // 返回简化的URL结构，只包含slug，带尾部斜杠
  return `/${slug}/`;
}

function formatArchiveDate(dateString, tz) {
  if (!dateString) return { iso: '', date: '', time: '' };
  try {
    const datetime = dayjs(dateString).tz(tz || 'UTC');
    return {
      iso: datetime.toISOString(),
      date: datetime.format('D MMM, YYYY'),
      time: datetime.format('hh:mm A'),
    };
  } catch (e) {
    return { iso: '', date: 'Invalid Date', time: '' };
  }
}

function createArchiveCardHTML(post, siteTimezone) {
  const pubDate = formatArchiveDate(post.data.pubDatetime, siteTimezone);
  const defaultImageClass = "w-[55px] h-[55px] object-cover rounded-md group-hover:opacity-90 transition-opacity duration-300";

  let imgSrc = '';
  if (post.data.ogImage) {
    if (typeof post.data.ogImage === 'string') {
      imgSrc = post.data.ogImage;
    } else if (post.data.ogImage.src) {
      imgSrc = post.data.ogImage.src;
    }
  }

  // 使用正确的路径生成函数
  const postPath = getPostPath(post.id);

  return `
    <li class="my-6 flex flex-row gap-6 items-start">
      ${imgSrc ? `
        <a href="${postPath}" class="shrink-0">
          <img
            src="${imgSrc}"
            alt="${post.data.title}"
            class="${defaultImageClass} mx-auto my-auto" 
            loading="lazy"
          />
        </a>
      ` : ''}
      <div class="flex-grow mx-auto my-auto">
        <a
          href="${postPath}"
          class="inline-block text-lg font-medium text-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
        >
          <h3 class="text-lg font-medium decoration-dashed hover:underline" style="view-transition-name: ${post.data.title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')}">${post.data.title}</h3>
        </a>
        <div class="flex items-end space-x-2 opacity-80">
          <svg class="inline-block size-6 min-w-[1.375rem] scale-90" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
            <line x1="16" x2="16" y1="2" y2="6"></line>
            <line x1="8" x2="8" y1="2" y2="6"></line>
            <line x1="3" x2="21" y1="10" y2="10"></line>
          </svg>
          <span class="sr-only">Published:</span>
          <span class="text-sm italic">
            <time datetime="${pubDate.iso}">${pubDate.date}</time>
            <span aria-hidden="true"> | </span>
            <span class="sr-only">&nbsp;at&nbsp;</span>
            <span class="text-nowrap">${pubDate.time}</span>
          </span>
        </div>
      </div>
    </li>
  `;
}

function createYearSectionHTML(year, yearGroup, siteTimezone, months) {
  let yearHTML = `
    <div class="year-section" data-year="${year}">
      <span class="text-2xl font-bold">${year}</span>
      <sup class="text-sm">${yearGroup.length}</sup>
  `;

  // 按月份分组
  const monthGroups = {};
  yearGroup.forEach(post => {
    const month = new Date(post.data.pubDatetime).getMonth() + 1;
    if (!monthGroups[month]) {
      monthGroups[month] = [];
    }
    monthGroups[month].push(post);
  });

  // 按月份排序（从新到旧）
  const sortedMonths = Object.entries(monthGroups)
    .sort(([monthA], [monthB]) => Number(monthB) - Number(monthA));

  sortedMonths.forEach(([month, monthGroup]) => {
    yearHTML += `
      <div class="flex flex-col sm:flex-row">
        <div class="mt-6 min-w-36 text-lg sm:my-6">
          <span class="font-bold">${months[Number(month) - 1]}</span>
          <sup class="text-xs">${monthGroup.length}</sup>
        </div>
        <ul class="month-posts" data-month="${month}">
    `;

    // 按发布时间排序（从新到旧）
    const sortedPosts = monthGroup.sort(
      (a, b) => new Date(b.data.pubDatetime).getTime() - new Date(a.data.pubDatetime).getTime()
    );

    sortedPosts.forEach(post => {
      yearHTML += createArchiveCardHTML(post, siteTimezone);
    });

    yearHTML += `
        </ul>
      </div>
    `;
  });

  yearHTML += `</div>`;
  return yearHTML;
}

export function initArchives(allPostsFromServer, siteTimezone, initialYearCount, yearsPerPage) {
  const archivesContainer = document.getElementById('archives-container');
  const loadMoreTrigger = document.getElementById('load-more-trigger');

  if (!archivesContainer) {
    return;
  }

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // 按年份分组
  const yearGroups = {};
  allPostsFromServer.forEach(post => {
    const year = new Date(post.data.pubDatetime).getFullYear();
    if (!yearGroups[year]) {
      yearGroups[year] = [];
    }
    yearGroups[year].push(post);
  });

  // 按年份排序（从新到旧）
  const sortedYears = Object.entries(yearGroups)
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA));

  let currentIndex = initialYearCount;

  function loadMoreYears() {
    if (!archivesContainer) {
      return;
    }

    const yearsToLoad = sortedYears.slice(currentIndex, currentIndex + yearsPerPage);

    if (yearsToLoad.length === 0 && loadMoreTrigger) {
      loadMoreTrigger.style.display = 'none';
      if (observer) {
        observer.disconnect();
      }
      return;
    }

    let newYearsHTML = '';
    yearsToLoad.forEach(([year, yearGroup]) => {
      newYearsHTML += createYearSectionHTML(year, yearGroup, siteTimezone, months);
    });

    archivesContainer.insertAdjacentHTML('beforeend', newYearsHTML);
    currentIndex += yearsToLoad.length;

    if (currentIndex >= sortedYears.length && loadMoreTrigger) {
      loadMoreTrigger.style.display = 'none';
      if (observer) {
        observer.disconnect();
      }
    }
  }

  let observer;
  if (loadMoreTrigger && sortedYears.length > initialYearCount) {
    observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreYears();
      }
    }, { threshold: 0.1 });
    observer.observe(loadMoreTrigger);
  } else if (loadMoreTrigger) {
    loadMoreTrigger.style.display = 'none';
  }
} 