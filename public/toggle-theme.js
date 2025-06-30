// 主题切换系统 - 增强版
// 功能特性：
// 1. 支持基于时间的自动主题切换（夜间自动切换到深色主题）
// 2. 支持用户手动设置主题（当天有效，次日重新启用自动切换）
// 3. 支持系统主题偏好检测
// 4. 完整的错误处理和调试功能

const primaryColorScheme = ""; // 主要颜色方案："light" | "dark" | "" (空字符串表示使用自动检测)

// 调试模式配置 - 生产环境请设置为 false
const DEBUG_THEME = false;

// 调试日志输出函数
function debugLog(message, ...args) {
  if (DEBUG_THEME) {
    console.log(`[Theme Debug] ${message}`, ...args);
  }
}

// 全局错误处理函数
function handleThemeError(error, context) {
  console.error(`[Theme Error] ${context}:`, error);
  // 确保主题系统仍能基本工作，即使出现错误也能恢复
  try {
    reflectPreference();
  } catch (e) {
    console.error("[Theme Error] 无法恢复主题状态:", e);
  }
}

// 全局变量，用于存储定时器和状态
let autoThemeTimer = null;        // 自动主题检查定时器
let systemThemeListener = null;   // 系统主题变化监听器

// 本地存储操作函数组 - 动态获取主题数据，避免缓存过期问题

// 获取当前存储的主题设置
function getCurrentThemeFromStorage() {
  return localStorage.getItem("theme");
}

// 检查用户是否手动设置过主题
function getUserManuallySetTheme() {
  return localStorage.getItem("userSetTheme") === "true";
}

// 获取用户设置主题的日期
function getUserSetThemeDate() {
  return localStorage.getItem("userSetThemeDate");
}

// 时间基础的主题判断函数 - 检查是否应该根据时间自动使用深色主题
function shouldUseDarkThemeByTime() {
  try {
    // 使用上海时区确保时间判断的一致性（避免服务器和客户端时区差异）
    const now = new Date();
    const shanghaiTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Shanghai"}));
    const hour = shanghaiTime.getHours();
    // 晚上6点(18:00)到早上7点(07:00)之间使用深色主题
    return hour >= 18 || hour < 7;
  } catch (error) {
    console.warn("时区转换失败，使用本地时间:", error);
    // 降级到本地时间（兼容性处理）
    const now = new Date();
    const hour = now.getHours();
    return hour >= 18 || hour < 7;
  }
}

// 日期工具函数 - 获取今天的日期字符串 (YYYY-MM-DD 格式)
function getTodayDateString() {
  try {
    // 使用上海时区确保日期判断的一致性（避免跨时区日期差异）
    const now = new Date();
    const shanghaiTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Shanghai"}));
    return shanghaiTime.getFullYear() + '-' + 
           String(shanghaiTime.getMonth() + 1).padStart(2, '0') + '-' + 
           String(shanghaiTime.getDate()).padStart(2, '0');
  } catch (error) {
    console.warn("时区转换失败，使用本地时间:", error);
    // 降级到本地时间（兼容性处理）
    const today = new Date();
    return today.getFullYear() + '-' + 
           String(today.getMonth() + 1).padStart(2, '0') + '-' + 
           String(today.getDate()).padStart(2, '0');
  }
}

// 用户偏好有效性检查 - 检查用户是否手动设置过主题且设置日期是今天
function isUserPreferenceValidToday() {
  // 如果用户没有手动设置过主题，直接返回false
  if (!getUserManuallySetTheme()) return false;
  
  const today = getTodayDateString();
  const setDate = getUserSetThemeDate();
  
  // 如果用户设置的日期不是今天，清除手动设置标记（实现"当天有效"功能）
  if (setDate !== today) {
    localStorage.removeItem("userSetTheme");
    localStorage.removeItem("userSetThemeDate");
    console.log("用户主题设置已过期，重新启用自动切换");
    return false;
  }
  
  return true;
}

// 核心主题获取函数 - 根据优先级顺序确定应该使用的主题
function getPreferTheme() {
  try {
    // 动态获取当前主题，避免缓存问题
    const currentTheme = getCurrentThemeFromStorage();
    
    // 调试信息输出
    debugLog("获取主题偏好", {
      currentTheme,
      isValidToday: isUserPreferenceValidToday(),
      shouldUseDark: shouldUseDarkThemeByTime(),
      primaryScheme: primaryColorScheme
    });
    
    // 优先级 1: 如果用户手动设置过主题且设置日期是今天，优先使用用户设置
    if (isUserPreferenceValidToday() && currentTheme) {
      debugLog("使用用户手动设置:", currentTheme);
      return currentTheme;
    }

    // 优先级 2: 如果没有有效的手动设置，检查是否应该根据时间使用深色主题
    if (shouldUseDarkThemeByTime()) {
      debugLog("使用时间自动切换: dark");
      return "dark";
    }

    // 优先级 3: 如果有预设的主题方案，使用预设方案
    if (primaryColorScheme) {
      debugLog("使用主题方案设置:", primaryColorScheme);
      return primaryColorScheme;
    }

    // 优先级 4: 最后使用用户设备的系统颜色方案偏好
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const systemTheme = systemDark ? "dark" : "light";
    debugLog("使用系统偏好:", systemTheme);
    return systemTheme;
  } catch (error) {
    // 错误处理：如果出现任何错误，默认返回浅色主题
    handleThemeError(error, "getPreferTheme");
    return "light"; // 默认浅色主题
  }
}

let themeValue = getPreferTheme();

function setPreference(userManualSet = false) {
  try {
    localStorage.setItem("theme", themeValue);
    
    // 只有用户手动设置时才标记为用户设置，并记录设置日期
    if (userManualSet) {
      localStorage.setItem("userSetTheme", "true");
      localStorage.setItem("userSetThemeDate", getTodayDateString());
      console.log(`用户手动设置主题为: ${themeValue}，当天有效`);
      debugLog("用户手动设置主题", { theme: themeValue, date: getTodayDateString() });
    } else {
      debugLog("自动设置主题", { theme: themeValue });
    }
    
    reflectPreference();
  } catch (error) {
    handleThemeError(error, "setPreference");
  }
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

// 清理定时器和监听器
function cleanupAutoTheme() {
  if (autoThemeTimer) {
    clearInterval(autoThemeTimer);
    autoThemeTimer = null;
  }
  
  if (systemThemeListener) {
    window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", systemThemeListener);
    systemThemeListener = null;
  }
}

// 设置自动主题检查
function setupAutoTheme() {
  // 先清理现有的定时器和监听器
  cleanupAutoTheme();
  
  // 如果用户没有有效的手动设置主题，添加定时器检查时间变化
  if (!isUserPreferenceValidToday()) {
    // 自动检查时间变化
    const autoThemeChecker = () => {
      // 重新获取当前主题值，确保同步
      themeValue = getPreferTheme();
      reflectPreference();
    };
    
    // 立即执行一次检查
    autoThemeChecker();
    
    // 设置每分钟检查一次时间
    autoThemeTimer = setInterval(autoThemeChecker, 60000);
    
    // 设置系统主题变化监听
    systemThemeListener = ({ matches: isDark }) => {
      // 只有当用户没有有效的手动设置主题且当前不在夜间时间段时，才根据系统变化同步
      if (!isUserPreferenceValidToday() && !shouldUseDarkThemeByTime()) {
        themeValue = isDark ? "dark" : "light";
        setPreference(false); // 系统同步不标记为用户手动设置
      }
    };
    
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", systemThemeListener);
  }
}

// set early so no page flashes / CSS is made aware
reflectPreference();

window.onload = () => {
  function setThemeFeature() {
    // set on load so screen readers can get the latest value on the button
    reflectPreference();

    // 清理旧的事件监听器（避免重复绑定）
    const existingBtn = document.querySelector("#theme-btn");
    if (existingBtn && existingBtn._themeClickHandler) {
      existingBtn.removeEventListener("click", existingBtn._themeClickHandler);
    }

    // 创建新的点击处理器
    const themeClickHandler = () => {
      themeValue = themeValue === "light" ? "dark" : "light";
      setPreference(true); // 用户点击按钮切换主题，标记为用户手动设置
      
      // 用户手动设置后，重新设置自动主题检查
      setupAutoTheme();
    };

    // 绑定新的事件监听器
    const themeBtn = document.querySelector("#theme-btn");
    if (themeBtn) {
      themeBtn._themeClickHandler = themeClickHandler;
      themeBtn.addEventListener("click", themeClickHandler);
    }
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
  
  // 设置自动主题检查
  setupAutoTheme();
};
