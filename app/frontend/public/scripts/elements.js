const main = document.querySelector('main');
const loginButton = document.querySelector(".log-in-btn");
const logoutButton = document.querySelector(".log-out-btn");
const timerButton = document.querySelector(".timer-btn");
const inspirationalMessage = document.querySelector(".inspiration");
const skipButton = document.querySelector(".skip-btn");
const addTaskButton = document.querySelector(".add-task-btn");
const addTaskInput = document.querySelector(".add-task-input");
const addTaskCancelButton = document.querySelector(".add-task-cancel-btn");
const addTaskSaveButton = document.querySelector(".add-task-save-btn");
const pomodorosInput = document.querySelector(".est-pomodoros");
const addTaskInputError = document.querySelector(".add-task-input-error");
const increasePomodorosButton = document.querySelector(".increase-pomodoros");
const decreasePomodorosButton = document.querySelector(".decrease-pomodoros");
const deleteTaskButton = document.querySelector(".delete-task-btn");
const showReportButton = document.querySelector(".show-report-btn");
const closeReportButton = document.querySelector(".close-report-btn");
const saveSessionButton = document.querySelector(".save-session-btn");
const cancelSessionButton = document.querySelector(".session-cancel-btn");
const confirmSessionButton = document.querySelector(".session-confirm-btn");
const prevWeekButton = document.querySelector(".prev-week-btn");
const nextWeekButton = document.querySelector(".next-week-btn");
const currentWeek = document.querySelector(".current-week");
const line = document.querySelector(".line");
const graphContainer = document.querySelector(".graph-container");
const taskListComponent = document.getElementById("task-list");
const pomodoroTab = document.getElementById("pomo");
const shortBreakTab = document.getElementById("short");
const longBreakTab = document.getElementById("long");
const addTaskDialog = document.getElementById("add-task-dialog");
const deleteTaskDialog = document.getElementById("delete-task-dialog");
const reportDialog = document.getElementById("report-dialog");
const reportSummaryButton = document.getElementById("report-summary-btn");
const reportDetailButton = document.getElementById("report-detail-btn");
const reportContentDescription = document.getElementById("report-content-description");
const sessionDialog = document.getElementById("session-dialog");
const reportSummary = document.getElementById("report-summary");
const hoursFocusedElement = document.getElementById("hours-focused");
const daysAccessedElement = document.getElementById("days-accessed");
const dayStreakElement = document.getElementById("day-streak");