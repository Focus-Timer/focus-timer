addTaskButton.onclick = () => {
    addTaskDialog.style.visibility = 'visible';
    addTaskDialog.style.display = 'flex';
}

addTaskCancelButton.onclick = () => {
    addTaskDialog.style.visibility = 'hidden';
    addTaskDialog.style.display = 'none';
}