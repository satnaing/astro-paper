// 为了数据的统一性,generateCalendar处理后赋值供全局使用
let processedActivities = [];

// 日历
function generateCalendar(activities, startDate, numWeeks) {
    const calendarElement = document.getElementById('calendar');
    // 清空当前日历内容
    calendarElement.innerHTML = ''; 
    
    const daysOfWeek = ['一', '二', '三', '四', '五', '六', '日']; 
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-week-header';
        dayElement.innerText = day;
        calendarElement.appendChild(dayElement);
    });

    const todayStr = getChinaTime().toISOString().split('T')[0];
    let currentDate = new Date(startDate);
    currentDate.setUTCHours(0, 0, 0, 0);

    // 清空处理过的活动数据
    processedActivities = [];
    let todayContainer = null;

    // 创建日历
    function createDayContainer(date, activities) {
        const dayContainer = document.createElement('div');
        dayContainer.className = 'day-container';

        const dateNumber = document.createElement('span');
        dateNumber.className = 'date-number';
        dateNumber.innerText = date.getUTCDate();
        dayContainer.appendChild(dateNumber);

        // 查找当前日期是否有活动数据
        const activity = activities.find(activity => activity.start_date_local === date.toISOString().split('T')[0]);
        // console.log(processedActivities);
        if (activity) processedActivities.push(activity);

        // 根据骑行距离设置球的大小
        const ballSize = activity ? Math.min(parseFloat(activity.distance) / 4, 24) : 2;

        const ball = document.createElement('div');
        ball.className = 'activity-indicator';
        ball.style.width = `${ballSize}px`;
        ball.style.height = `${ballSize}px`;
        if (!activity) ball.classList.add('no-activity');
        ball.style.left = '50%';
        ball.style.top = '50%';
        dayContainer.appendChild(ball);

        // 鼠标悬停动画
        dayContainer.addEventListener('mouseenter', () => {
            if (date.toDateString() === new Date().toDateString()) {
                dateNumber.style.opacity = '0';
                ball.style.opacity = '1';
            } else {
                if (todayContainer) {
                    todayContainer.querySelector('.date-number').style.opacity = '0';
                    todayContainer.querySelector('.activity-indicator').style.opacity = '1';
                }
            }
        });
        dayContainer.addEventListener('mouseleave', () => {
            if (date.toDateString() === new Date().toDateString()) {
                dateNumber.style.opacity = '1';
                ball.style.opacity = '0';
            } else {
                if (todayContainer) {
                    todayContainer.querySelector('.date-number').style.opacity = '1';
                    todayContainer.querySelector('.activity-indicator').style.opacity = '0';
                }
            }
        });

        // 如果是今天的日期，添加特定样式
        if (date.toDateString() === new Date().toDateString()) {
            // 记录今天的日期
            todayContainer = dayContainer;
            dayContainer.classList.add('today');
            ball.style.backgroundColor = '#242428';
            dateNumber.style.color = '#242428';
            dateNumber.style.opacity = '1';
            ball.style.opacity = '0';
        }
        return dayContainer;
    }

    // 异步显示,模仿打字机效果
    async function displayCalendar() {
        for (let week = 0; week < numWeeks; week++) {
            for (let day = 0; day < 7; day++) {
                const currentDateStr = currentDate.toISOString().split('T')[0];
                // 不再计算超过今天的日期
                if (currentDateStr > todayStr) return;
                
                const dayContainer = createDayContainer(currentDate, activities);
                calendarElement.appendChild(dayContainer);

                // 速度控制
                await new Promise(resolve => setTimeout(resolve, 30));
                currentDate.setUTCDate(currentDate.getUTCDate() + 1);
            }
        }
    }
    // 显示日历并在结束后显示柱形图和总活动数
    displayCalendar().then(() => {
        generateBarChart();
        displayTotalActivities();
    });
}

// 生成柱形图
function generateBarChart() {
    const barChartElement = document.getElementById('barChart');
    // 清空柱形图内容
    barChartElement.innerHTML = '';

    const today = getChinaTime();
    const startDate = getStartDate(today, 21);

    // 创建所有周的时间范围
    const weeklyData = {};
    let currentWeekStart = new Date(startDate);
    currentWeekStart.setUTCHours(0, 0, 0, 0);

    // 按周计算未来 4 周的日期范围
    for (let i = 0; i < 4; i++) {
        const weekStart = new Date(currentWeekStart);
        const weekEnd = new Date(weekStart);
        weekEnd.setUTCDate(weekStart.getUTCDate() + 6); // 一周结束日期为开始日期 +6 天
        const weekKey = `${weekStart.toISOString().split('T')[0]} - ${weekEnd.toISOString().split('T')[0]}`;

        weeklyData[weekKey] = 0; // 初始化每周骑行数据为 0
        currentWeekStart.setUTCDate(currentWeekStart.getUTCDate() + 7); // 移动到下一周
    }

    // 累加每周的骑行距离
    processedActivities.forEach(activity => {
        const activityDate = new Date(activity.start_date_local);
        const weekStart = getWeekStartDate(activityDate); // 活动所在周的开始日期
        const weekEnd = new Date(weekStart);
        weekEnd.setUTCDate(weekStart.getUTCDate() + 6);

        const weekKey = `${weekStart.toISOString().split('T')[0]} - ${weekEnd.toISOString().split('T')[0]}`;
        if (weeklyData[weekKey] !== undefined) {
            weeklyData[weekKey] += parseFloat(activity.distance);
        }
    });

    // 获取最大骑行距离（用于柱形图比例）
    const maxDistance = Math.max(...Object.values(weeklyData), 0);

    // 创建并显示每周的柱形图
    Object.keys(weeklyData).forEach(week => {
        const distance = weeklyData[week]; // 当前周的骑行距离
        const barContainer = document.createElement('div');
        barContainer.className = 'bar-container';

        const bar = document.createElement('div');
        bar.className = 'bar';

        // 计算柱形图的宽度
        const width = maxDistance > 0 ? (distance / maxDistance) * 190 : 0;
        bar.style.setProperty('--bar-width', `${width}px`);

        const distanceText = document.createElement('div');
        distanceText.className = 'cycling-kilometer';
        distanceText.innerText = '0 km';

        const messageBox = createMessageBox();
        const clickMessageBox = createMessageBox();

        barContainer.style.position = 'relative';
        bar.appendChild(distanceText);
        barContainer.appendChild(bar);
        barContainer.appendChild(messageBox);
        barContainer.appendChild(clickMessageBox);
        barChartElement.appendChild(barContainer);

        // 动画效果：逐渐显示柱形图宽度
        bar.style.width = '0';
        bar.offsetHeight;
        bar.style.transition = 'width 1s ease-out';
        bar.style.width = `${width}px`;

        distanceText.style.opacity = '1';
        // 动态更新柱形图的数值
        animateText(distanceText, 0, distance, 1000, true);
        setupBarInteractions(bar, messageBox, clickMessageBox, distance);
    });
}

// 动态文本显示
function animateText(element, startValue, endValue, duration, isDistance = false) {
    const startTime = performance.now();
    function update() {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = (progress * endValue).toFixed(2);
        element.innerText = isDistance ? `${currentValue} km` : `${currentValue}h`;
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.innerText = isDistance ? `${endValue.toFixed(2)} km` : `${endValue.toFixed(2)}h`;
        }
    }
    update();
}

// 计算总公里数
function calculateTotalKilometers(activities) {
    return activities.reduce((total, activity) => total + parseFloat(activity.distance) || 0, 0);
}

// 显示总活动数和总公里数
function displayTotalActivities(activities) {
    // 全年骑行时长
    const ridingTimeThisYear = document.getElementById('totalCount');
    // 全年骑行公里数
    const milesRiddenThisYear = document.getElementById('milesRiddenThisYear');
    // 动态年标题《2025 骑行总时长》
    const totalTitleElement = document.getElementById('totalTitle');

    if (!ridingTimeThisYear || !milesRiddenThisYear || !totalTitleElement) return;

    const ridingTimeThisYearValue = ridingTimeThisYear.querySelector('#ridingTimeThisYearValue');
    const milesRiddenThisYearValue = milesRiddenThisYear.querySelector('#milesRiddenThisYearValue');

    const totalCountSpinner = ridingTimeThisYear.querySelector('.loading-spinner');
    const milesRiddenThisYearSpinner = milesRiddenThisYear.querySelector('.loading-spinner');

    totalCountSpinner.classList.add('active');
    milesRiddenThisYearSpinner.classList.add('active');

    const currentYear = new Date().getFullYear();
    totalTitleElement.textContent = `${currentYear} 骑行总时长`;

    // 筛选全年活动数据
    const filteredActivities = activities.filter(activity => {
        const activityYear = new Date(activity.start_date_local).getFullYear();
        return activityYear === currentYear;
    });

    // 计算全年活动时间的总和（单位：小时）
    const totalMovingTime = filteredActivities.reduce((total, activity) => {
        return total + parseFloat(activity.moving_time) || 0;
    }, 0);

    // 计算全年总公里数
    const totalKilometers = calculateTotalKilometers(filteredActivities);

    // 动画效果
    animateCount(ridingTimeThisYearValue, totalMovingTime, 1000, 50, false);
    animateCount(milesRiddenThisYearValue, totalKilometers, 1000, 50, true);

    setTimeout(() => {
        console.log(totalKilometers.toFixed(2));
        ridingTimeThisYearValue.textContent = `${totalMovingTime.toFixed(2)} h`;
        milesRiddenThisYearValue.textContent = `${totalKilometers.toFixed(2)} km`;
        totalCountSpinner.classList.remove('active');
        milesRiddenThisYearSpinner.classList.remove('active');
    }, 1000);
}

// 获取一周的开始日期
function getWeekStartDate(date) {
    const day = date.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    const weekStart = new Date(date);
    weekStart.setDate(weekStart.getDate() + diff);
    return weekStart;
}

// 获取中国时间 UTC+8
function getChinaTime() {
    const now = new Date();
    const offset = 8 * 60 * 60 * 1000;
    return new Date(now.getTime() + offset);
}

// 手搓JSON
async function loadActivityData() {
    const response = await fetch('https://cos.lhasa.icu/assets/strava_data.json');
    return response.json();
}

// 加载数据并生成日历
(async function() {
    const today = getChinaTime();
    const startDate = getStartDate(today, 21);

    const activities = await loadActivityData();
    // 显示4周的日历
    generateCalendar(activities, startDate, 4);

    // 显示全年骑行时长和公里数
    displayTotalActivities(activities);
})();

// 创建消息框
function createMessageBox() {
    const messageBox = document.createElement('div');
    messageBox.className = 'message-box';
    return messageBox;
}

// 获取起始时间（从周一开始）
function getStartDate(today, daysOffset) {
    const currentDayOfWeek = today.getUTCDay();
    const daysToMonday = (currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1);
    const startDate = new Date(today);
    startDate.setUTCDate(today.getUTCDate() - daysToMonday - daysOffset);
    return startDate;
}

// 动态更新计数器
function animateCount(element, totalValue, duration, intervalDuration, isDistance = false) {
    const step = totalValue / (duration / intervalDuration);
    let count = 0;
    const interval = setInterval(() => {
        count += step;
        if (count >= totalValue) {
            count = totalValue;
            clearInterval(interval);
        }
        element.textContent = isDistance ? `${count.toFixed(2)} km` : `${count.toFixed(2)} h`;
    }, intervalDuration);

    // 在动画结束后，确保单位正确
    setTimeout(() => {
        if (isDistance) {
            element.textContent = `${totalValue.toFixed(2)} km`;
        } else {
            element.textContent = `${totalValue.toFixed(2)} h`;
        }
    }, duration);
}

// 柱形图交互
function setupBarInteractions(bar, messageBox, clickMessageBox, weeklyData) {
    let mouseLeaveTimeout;
    let autoHideTimeout;

    bar.addEventListener('mouseenter', () => {
        clearTimeout(mouseLeaveTimeout);
        clearTimeout(autoHideTimeout);

        const message = weeklyData > 140 ? '这周干的还不错' : '偷懒了啊';
        messageBox.innerText = message;
        messageBox.classList.add('show');

        autoHideTimeout = setTimeout(() => {
            messageBox.classList.remove('show');
        }, 700);
    });

    bar.addEventListener('mouseleave', () => {
        mouseLeaveTimeout = setTimeout(() => {
            messageBox.classList.remove('show');
        }, 700);
    });

    bar.addEventListener('click', () => {
        clickMessageBox.innerText = '一起来运动吧！';
        clickMessageBox.classList.add('show');
        setTimeout(() => {
            clickMessageBox.classList.remove('show');
        }, 700);

        messageBox.classList.remove('show');
        clearTimeout(mouseLeaveTimeout);
        clearTimeout(autoHideTimeout);
    });
}