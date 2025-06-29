const primaryColorScheme = ""; // "light" | "dark"

// Get theme data from local storage
const currentTheme = localStorage.getItem("theme");
const userManuallySetTheme = localStorage.getItem("userSetTheme") === "true";

// 检查是否应该根据时间自动使用深色主题
function shouldUseDarkThemeByTime() {
  const now = new Date();
  const hour = now.getHours();
  // 晚上6点(18:00)到早上7点(07:00)之间使用深色主题
  return hour >= 18 || hour < 7;
}

// 检查用户是否手动设置过主题（如果手动设置过，时间规则将不生效）
function isUserPreferenceSet() {
  return userManuallySetTheme;
}

function getPreferTheme() {
  // 如果用户手动设置过主题，优先使用用户设置
  if (userManuallySetTheme && currentTheme) return currentTheme;

  // 如果没有手动设置，检查是否应该根据时间使用深色主题
  if (shouldUseDarkThemeByTime() && !isUserPreferenceSet()) return "dark";

  // 如果有主题方案设置，使用设置的方案
  if (primaryColorScheme) return primaryColorScheme;

  // 最后使用用户设备的颜色方案偏好
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

let themeValue = getPreferTheme();

function setPreference(userManualSet = false) {
  localStorage.setItem("theme", themeValue);
  
  // 只有用户手动设置时才标记为用户设置
  if (userManualSet) {
    localStorage.setItem("userSetTheme", "true");
  }
  
  reflectPreference();
}

function reflectPreference() {
  document.firstElementChild.setAttribute("data-theme", themeValue);

  document.querySelector("#theme-btn")?.setAttribute("aria-label", themeValue);

  // Get a reference to the body element
  const body = document.body;

  // Check if the body element exists before using getComputedStyle
  if (body) {
    // Get the computed styles for the body element
    const computedStyles = window.getComputedStyle(body);

    // Get the background color property
    const bgColor = computedStyles.backgroundColor;

    // Set the background color in <meta theme-color ... />
    document
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", bgColor);
  }
}

// set early so no page flashes / CSS is made aware
reflectPreference();

window.onload = () => {
  function setThemeFeature() {
    // set on load so screen readers can get the latest value on the button
    reflectPreference();

    // now this script can find and listen for clicks on the control
    document.querySelector("#theme-btn")?.addEventListener("click", () => {
      themeValue = themeValue === "light" ? "dark" : "light";
      setPreference(true); // 用户点击按钮切换主题，标记为用户手动设置
    });
  }

  setThemeFeature();

  // Runs on view transitions navigation
  document.addEventListener("astro:after-swap", setThemeFeature);

  // Set theme-color value before page transition
  // to avoid navigation bar color flickering in Android dark mode
  document.addEventListener("astro:before-swap", event => {
    const bgColor = document
      .querySelector("meta[name='theme-color']")
      ?.getAttribute("content");

    event.newDocument
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", bgColor);
  });
  
  // 如果用户没有手动设置主题，添加定时器检查时间变化
  if (!isUserPreferenceSet()) {
    // 自动检查时间变化
    const autoThemeChecker = () => {
      const shouldBeDark = shouldUseDarkThemeByTime();
      if (shouldBeDark && themeValue === "light") {
        themeValue = "dark";
        setPreference(false); // 自动切换不标记为用户手动设置
      } else if (!shouldBeDark && themeValue === "dark") {
        themeValue = "light";
        setPreference(false); // 自动切换不标记为用户手动设置
      }
    };
    
    // 立即执行一次检查
    autoThemeChecker();
    
    // 设置每分钟检查一次时间
    setInterval(autoThemeChecker, 60000);
  }
};

// sync with system changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    // 只有当用户没有手动设置主题且当前不在夜间时间段时，才根据系统变化同步
    if (!isUserPreferenceSet() && !shouldUseDarkThemeByTime()) {
    themeValue = isDark ? "dark" : "light";
      setPreference(false); // 系统同步不标记为用户手动设置
    }
  });
