pomodorosInput.addEventListener('input', pomodorosChangeHandler);
addTaskSaveButton.disabled = false;
let taskList = [];
let currentTaskItem = 0;

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
        const task = {
            taskName: addTaskInput.value,
            taskPomodoros: pomodorosInput.value,
        };
        taskList.push(task);
        updateTaskList();

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

taskListComponent.addEventListener('click', function(event){
        
        const li = event.target.closest('li');
        const nodes = Array.from( taskListComponent.children );
        const index = nodes.indexOf(li);
        if (index > -1 && index < taskList.length) {
            document.getElementById('task-' + currentTaskItem).classList.remove('active-task');
            currentTaskItem = index;
            document.getElementById('task-' + currentTaskItem).classList.add('active-task');
        }
        
    
 });

function pomodorosChangeHandler() {
    if (pomodorosInput.value > 99) {
        pomodorosInput.value = 99;
    } else if (pomodorosInput.value < 0) {
        pomodorosInput.value = 0;
    } else if (!pomodorosInput.value) {
        pomodorosInput.value = 0;
    }
}

function updateTaskList() {
    let listItem, taskName, taskPomodoros;
    taskListComponent.innerHTML = '';

    for (var i = 0; i < taskList.length; i++) {
        let task = taskList[i];
        listItem = document.createElement("li");
        taskName = document.createElement("p");
        taskPomodoros = document.createElement("p");

        listItem.setAttribute('id', 'task-' + i);
        listItem.classList.add('task-item');
        if (i == currentTaskItem) {
            listItem.classList.add('active-task');
        } else {
            listItem.classList.remove('active-task');
        }
        taskName.textContent = task.taskName;
        taskPomodoros.textContent = '0/' + task.taskPomodoros;

        listItem.appendChild(taskName);
        listItem.appendChild(taskPomodoros);

        taskListComponent.appendChild(listItem);
    }
}