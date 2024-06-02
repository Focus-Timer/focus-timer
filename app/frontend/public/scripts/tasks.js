pomodorosInput.addEventListener('input', pomodorosChangeHandler);
addTaskSaveButton.disabled = false;
let taskList = [];
let currentTaskItem = 0;
let deleteTaskVisible = false;
let deleteTaskClicked = false;
let taskToDelete = -1;

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
            currentPomodoro: 0,
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
    if (pomodorosInput.value < 44) {
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
    if (pomodorosInput.value > 43) {
        pomodorosInput.value = 43;
    } else if (pomodorosInput.value < 0) {
        pomodorosInput.value = 0;
    } else if (!pomodorosInput.value) {
        pomodorosInput.value = 0;
    }
}

function updateTaskList() {

    taskListComponent.innerHTML = '';

    for (var i = 0; i < taskList.length; i++) {
        let task = taskList[i];
        listItem = document.createElement("li");

        listItem.setAttribute('id', 'task-' + i);
        listItem.classList.add('task-item');
        if (i == currentTaskItem) {
            listItem.classList.add('active-task');
        } else {
            listItem.classList.remove('active-task');
        }

        listItem.innerHTML += `<section class="task-left">
                                    <input type="checkbox" class="checkbox-round" />
                                    <h4>${task.taskName}</h4>    
                                </section>
                                <section class="task-right">
                                    <p>${task.currentPomodoro}/${task.taskPomodoros}</p>
                                    <ul class="ellipse">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    </ul>
                                </section>`

        taskListComponent.appendChild(listItem);
    }

    checkboxes = taskListComponent.querySelectorAll('.checkbox-round');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', handleCheckboxChange);
    });

    ellipses = document.querySelectorAll(".ellipse");
    ellipses.forEach(ellipse => {
        ellipse.addEventListener('click', function() {
            const buttonRect = ellipse.getBoundingClientRect();
            deleteTaskDialog.style.top = buttonRect.top + 'px';
            deleteTaskDialog.style.left = (buttonRect.right + 8) + 'px';
            deleteTaskDialog.style.visibility = 'visible';
            deleteTaskDialog.style.display = 'flex';
            deleteTaskClicked = true;
            deleteTaskVisible = true;
            taskToDelete = Array.from(taskListComponent.children).indexOf(ellipse.closest('li'));
      });
    });
}

document.addEventListener('click', function(event) {
    if (deleteTaskVisible) {
        if (!event.target.matches('.delete-task-btn')) {
            if (!deleteTaskClicked) {
                this.deleteTaskVisible = false;
                deleteTaskDialog.style.visibility = 'hidden';
                deleteTaskDialog.style.display = 'none';
                taskToDelete = -1;
            } else {
                deleteTaskClicked = false;
            }
        } else if (taskToDelete !== -1) {
            // Update current task
            if (currentTaskItem === taskToDelete) {
                if (taskList.length === 1) {
                    currentTaskItem = 0;
                } else {
                    (currentTaskItem + 1) < taskList.length ? currentTaskItem++ : currentTaskItem--;
                }
            }

            // Delete task
            taskListComponent.children[taskToDelete].remove();
            taskList.splice(taskToDelete, 1);
            taskToDelete = -1;

            // Hide popup
            deleteTaskDialog.style.visibility = 'hidden';
            deleteTaskDialog.style.display = 'none';
            deleteTaskVisible = false;
            deleteTaskClicked = false;
                
            updateTaskList();
        }
    }
  });


function handleCheckboxChange(event) {
    const checkbox = event.target;
    const listItem = checkbox.parentElement.parentElement;
    
    if (checkbox.checked) {
        listItem.classList.add('strike-through');
    } else {
        listItem.classList.remove('strike-through');
    }
}