const minutesElement = document.querySelector('.minutes');
const secondsElement = document.querySelector('.seconds');
let countdown;

const countDownClock = (minutes = 25, seconds = 0) => {
  const now = Date.now();
  const then = now + (seconds + (minutes * 60)) * 1000;
  
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
  
    if(secondsLeft <= 0) {
      clearInterval(countdown);
      return;
    };
  
    displayTimeLeft(secondsLeft);
  
  },1000);
}
  
function displayTimeLeft(seconds) {
  minutesElement.textContent = Math.floor((seconds % 86400) % 3600 / 60);
  secondsElement.textContent = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
}
  
timerButton.onclick = () => {
  if (timerButton.textContent === 'Start') {
    countDownClock(Number(minutesElement.textContent), Number(secondsElement.textContent));
    timerButton.textContent = 'Stop';
  } else if (timerButton.textContent === 'Stop') {
    clearInterval(countdown);
    timerButton.textContent = 'Start';
  }   
}

pomodoroTab.onclick = () => {
  clearInterval(countdown);
  timerButton.textContent = 'Start';
  shortBreakTab.classList.remove('is-active');
  longBreakTab.classList.remove('is-active');
  pomodoroTab.classList.add('is-active');
  minutesElement.textContent = '25';
  secondsElement.textContent = '00';
}

shortBreakTab.onclick = () => {
  clearInterval(countdown);
  timerButton.textContent = 'Start';
  pomodoroTab.classList.remove('is-active');
  longBreakTab.classList.remove('is-active');
  shortBreakTab.classList.add('is-active');
  minutesElement.textContent = '05';
  secondsElement.textContent = '00';
}

longBreakTab.onclick = () => {
  clearInterval(countdown);
  timerButton.textContent = 'Start';
  shortBreakTab.classList.remove('is-active');
  pomodoroTab.classList.remove('is-active');
  longBreakTab.classList.add('is-active');
  minutesElement.textContent = '15';
  secondsElement.textContent = '00';
}
  
  