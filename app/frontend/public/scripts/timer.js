const minutesElement = document.querySelector('.minutes');
const secondsElement = document.querySelector('.seconds');
let mySound = new Audio('resources/271666__honorhunter__tomato-squishwet.wav')
let countdown;
let tempPomodoro = 1;

const countDownClock = (minutes = 25, seconds = 0) => {
  const now = Date.now();
  const then = now + (seconds + (minutes * 60)) * 1000;
  
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
  
    if(secondsLeft <= 0) {
      clearInterval(countdown);

      if (taskList.length > 0) {
        if (minutes === 25) {
          taskList[currentTaskItem].currentPomodoro++;
          if (taskList[currentTaskItem].currentPomodoro % 4 !== 0) {
            goToShortBreak();
          } else {
            goToLongBreak();
          }
          updateTaskList();
        } else if (minutes === 5) {
          goToPomodoro();
        } else if (minutes === 15) {
          goToPomodoro();
        }
      } else {
        if (minutes === 25) {
          tempPomodoro++;
          if (tempPomodoro % 4 !== 0) {
            goToShortBreak();
          } else {
            goToLongBreak();
          }
          
        } else if (minutes === 5 || minutes === 15) {
          goToPomodoro();
        }
      }
      
      return;
    };
  
    displayTimeLeft(secondsLeft);
  
  },1000);
}
  
function displayTimeLeft(seconds) {
  minutesElement.textContent = Math.floor((seconds % 86400) % 3600 / 60);
  secondsElement.textContent = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
}

function goToPomodoro() {
  clearInterval(countdown);
  timerButton.textContent = 'Start';
  shortBreakTab.classList.remove('is-active');
  longBreakTab.classList.remove('is-active');
  pomodoroTab.classList.add('is-active');
  minutesElement.textContent = '25';
  secondsElement.textContent = '00';
  inspirationalMessage.textContent = `Hocus pocus, let's help you focus ✨`;
  skipButton.style.visibility = 'hidden';
}

function goToShortBreak() {
  clearInterval(countdown);
  timerButton.textContent = 'Start';
  pomodoroTab.classList.remove('is-active');
  longBreakTab.classList.remove('is-active');
  shortBreakTab.classList.add('is-active');
  minutesElement.textContent = '05';
  secondsElement.textContent = '00';
  inspirationalMessage.textContent = `Alakazam, it's time for a quick jam 🥫`;
  skipButton.style.visibility = 'hidden';
}

function goToLongBreak() {
  clearInterval(countdown);
  timerButton.textContent = 'Start';
  shortBreakTab.classList.remove('is-active');
  pomodoroTab.classList.remove('is-active');
  longBreakTab.classList.add('is-active');
  minutesElement.textContent = '15';
  secondsElement.textContent = '00';
  inspirationalMessage.textContent = `Abra-cadabra, go replenish your chakra 🧘‍♀️`;
  skipButton.style.visibility = 'hidden';
}
  
timerButton.onclick = () => {
  mySound.play()
  if (timerButton.textContent === 'Start') {
    countDownClock(Number(minutesElement.textContent), Number(secondsElement.textContent));
    timerButton.textContent = 'Stop';
    skipButton.style.visibility = 'visible'
  } else if (timerButton.textContent === 'Stop') {
    clearInterval(countdown);
    timerButton.textContent = 'Start';
    skipButton.style.visibility = 'hidden'
  }   
}

pomodoroTab.onclick = () => {
  mySound.play()
  goToPomodoro();
}

shortBreakTab.onclick = () => {
  mySound.play()
  goToShortBreak();
}

longBreakTab.onclick = () => {
  mySound.play()
  goToLongBreak();
}

skipButton.onclick = () => {
  mySound.play()
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
  clearInterval(countdown);
  if (taskList.length > 0) {
    if (pomodoroTab.classList.contains('is-active')) {
      taskList[currentTaskItem].currentPomodoro++;
      if (taskList[currentTaskItem].currentPomodoro % 4 !== 0) {
        goToShortBreak();
      } else {
        goToLongBreak();
      }
      updateTaskList();
    } else if (shortBreakTab.classList.contains('is-active') || longBreakTab.classList.contains('is-active')) { 
      goToPomodoro();
  }
  } else {
    if (pomodoroTab.classList.contains('is-active')) {
      tempPomodoro++;
      if (tempPomodoro % 4 !== 0) {
        goToShortBreak();
      } else {
        goToLongBreak();
      }
    } else if (shortBreakTab.classList.contains('is-active') || longBreakTab.classList.contains('is-active')) { 
        goToPomodoro();
    }
  }
  
}
  
