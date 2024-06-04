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
    let totalPomodoros = 0;
    taskList.forEach((task) => {
        totalPomodoros += Number(task.currentPomodoro);
    });
    // Get current user

    taskList = [];
    taskListComponent.innerHTML = "";
    taskToDelete = -1;
    currentTaskItem = 0;
    goToPomodoro();
    main.classList.remove('blur');
    sessionDialog.style.visibility = 'hidden';
}