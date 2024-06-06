saveSessionButton.onclick = () => {
    main.classList.add('blur');
    sessionDialog.style.visibility = 'visible';
}

cancelSessionButton.onclick = () => {
    main.classList.remove('blur');
    sessionDialog.style.visibility = 'hidden';
}

confirmSessionButton.onclick = () => {
    // BACKEND CALL TO SAVE SESSION
    let totalPomodoros = 0.00;
    taskList.forEach((task) => {
        totalPomodoros += parseFloat(task.pomodorosCompleted);
    });
    postReport(totalPomodoros.toFixed(2));

    taskList = [];
    taskListComponent.innerHTML = "";
    taskToDelete = -1;
    currentTaskItem = 0;
    goToPomodoro();
    main.classList.remove('blur');
    sessionDialog.style.visibility = 'hidden';
}

async function postReport(numPomodoros) {
    console.log(sessionStorage.getItem('id_token'));
    try {
      response = await fetch('/api/report/postReport', {
        method: "POST",
        mode: "cors",
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('id_token')}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "pomodoros": parseFloat(5.5).toFixed(2)
        }),
      });
  
  
      console.log(response);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }