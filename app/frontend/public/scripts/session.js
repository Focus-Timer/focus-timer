saveSessionButton.onclick = () => {
  main.classList.add("blur");
  sessionDialog.style.visibility = "visible";
};

cancelSessionButton.onclick = () => {
  main.classList.remove("blur");
  sessionDialog.style.visibility = "hidden";
};

confirmSessionButton.onclick = () => {
  // BACKEND CALL TO SAVE SESSION
  let totalPomodoros = 0.0;
  taskList.forEach((task) => {
    totalPomodoros += parseFloat(task.pomodorosCompleted);
  });

  if(totalPomodoros > 0.00)
  {

  try {
    postReport(totalPomodoros.toFixed(2));
  } catch (err) {
    console.log(err);
  }
}

  taskList = [];
  taskListComponent.innerHTML = "";
  taskToDelete = -1;
  currentTaskItem = 0;
  goToPomodoro();
  main.classList.remove("blur");
  sessionDialog.style.visibility = "hidden";
  tempPomodoro = 1;
};

const postReport = async (numPomodoros) => {
  
    try {
      const response = await fetch(`/api/report/postReport`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("id_token")}`,
        },
        body: JSON.stringify({
          pomodoros: numPomodoros,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();

    } catch (err) {
      console.log(err);
    }

 
};

