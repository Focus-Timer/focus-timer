let currentWeekStartDate = new Date();
let currentWeekEndDate = new Date();
let currentWeekStart = currentWeekStartDate.getDate() - currentWeekStartDate.getDay() + 1;
const xValues = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saterday', 'Sunday'];
let yValues = [0, 0, 0, 0, 0, 0, 0];

showReportButton.onclick = () => {
  var firstday = new Date(currentWeekStartDate.setDate(currentWeekStart));
  getAPIData(`${formatDate(firstday)} 00:00:00`);
    main.classList.add('blur');
    reportDialog.style.visibility = 'visible';
}

closeReportButton.onclick = () => {
    main.classList.remove('blur');
    reportDialog.style.visibility = 'hidden';
}

prevWeekButton.onclick = () => {
    currentWeekStartDate.setDate(currentWeekStartDate.getDate() - 7);
    currentWeekStart = currentWeekStartDate.getDate() - currentWeekStartDate.getDay() + 1;
    updateChart();
}
                            
nextWeekButton.onclick = () => {
  currentWeekStartDate.setDate(currentWeekStartDate.getDate() + 7);
  currentWeekStart = currentWeekStartDate.getDate() - currentWeekStartDate.getDay() + 1;
    updateChart();
}

reportSummaryButton.onclick = () => {
    reportContentDescription.textContent = 'Activity Summary';
    line.style.width = '70%';
    reportSummary.classList.remove('hide-component');
    graphContainer.classList.add('hide-component');
    reportSummaryButton.classList.add('report-button-active');
    reportDetailButton.classList.remove('report-button-active');
}

reportDetailButton.onclick = () => {
    reportContentDescription.textContent = 'Weekly Pomodoros';
    line.style.width = '62.4%';
    reportSummary.classList.add('hide-component');
    graphContainer.classList.remove('hide-component');
    updateChart();
    reportSummaryButton.classList.remove('report-button-active');
    reportDetailButton.classList.add('report-button-active');
}

function updateChart() {
    var firstday = new Date(currentWeekStartDate.setDate(currentWeekStart));
    var lastday = new Date(currentWeekEndDate.setDate(currentWeekStart + 6));
    currentWeek.textContent = `${formatDate(firstday)} to ${formatDate(lastday)}`;
    getAPIData(`${formatDate(firstday)} 00:00:00`);
    // MAKE API CALL WITH `formatDate(firstDay) 00:00:00` to populate y-values
    // Update week description below chart as well
    
    new Chart("focus-hours-chart", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [{
            borderColor: "rgba(0,0,255,0.1)",
            data: yValues
          }]
        },
        options: {
          legend: {display: false}
        }
      });
}


function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

async function getAPIData(mondayDate) {
  try {
    response = await fetch(`/api/report/getReport?week-start=${mondayDate}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem('id_token')}`,
        "Content-Type": "application/json"
      },
    });


    console.log(response);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    dailyPomodoros = data['report'].map(a => a.pomodorosTotal);
    yValues = [0, 0, 0, 0, 0, 0, 0];
    let sum = 0.00;
    let daysAccessed = 0;
    let dayStreak = 0;
    let streakBroken = false;
    for (let i = 0; i < 7; i++) {
      if (dailyPomodoros[i] && parseFloat(dailyPomodoros[i]) > 0.00) {
        daysAccessed++;
        if (!streakBroken) {
          dayStreak++;
        }
        yValues[i] = parseFloat(dailyPomodoros[i]);
        sum = (parseFloat(sum) + parseFloat(dailyPomodoros[i])).toFixed(2);
      } else {
        streakBroken = true;
      }
      
    }

    daysAccessedElement.textContent = daysAccessed;
    hoursFocusedElement.textContent = sum;
    dayStreakElement.textContent = dayStreak;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}