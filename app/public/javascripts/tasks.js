pomodorosInput.addEventListener('input', pomodorosChangeHandler);
addTaskSaveButton.disabled = false;

function pomodorosChangeHandler() {
    if (pomodorosInput.value > 99) {
        pomodorosInput.value = 99;
    } else if (pomodorosInput.value < 0) {
        pomodorosInput.value = 0;
    } else if (!pomodorosInput.value) {
        pomodorosInput.value = 0;
    }
}

addTaskButton.onclick = () => {
    addTaskDialog.style.visibility = 'visible';
    addTaskDialog.style.display = 'flex';
}

addTaskCancelButton.onclick = () => {
    addTaskDialog.style.visibility = 'hidden';
    addTaskDialog.style.display = 'none';
    addTaskInput.value = '';
    pomodorosInput.value = 0;
}

addTaskSaveButton.onclick = () => {
    if (String(addTaskInput.value).length < 1) {
        addTaskInputError.classList.remove('hide-component');
    } else {
        addTaskInputError.classList.add('hide-component');
        //add task
        addTaskDialog.style.visibility = 'hidden';
        addTaskDialog.style.display = 'none';
        addTaskInput.value = '';
        pomodorosInput.value = 0;
    }
}


increasePomodorosButton.onclick = () => {
    if (pomodorosInput.value < 100) {
        ++pomodorosInput.value;
    }  
}

decreasePomodorosButton.onclick = () => {
    if (pomodorosInput.value > 0) {
        --pomodorosInput.value;
    }  
}