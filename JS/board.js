/**
 * load content of board page
 */
async function initBoard() {
    checkIfLogged();
    await downloadFromServer();
    await loadTasks();
    checkProgressBar();
    updateTasksPercent();
    updateToDo();
    updateInProgress();
    updateAwaitingFeedback();
    updateDone();
    fillInAssinged();
    fillInCategory();
    animateNewTask();
}

/**
 * update percantage of every task
 */
function updateTasksPercent() {
    for (let i = 0; i < tasks.length; i++) {
        let element = tasks[i];
        let allTasks = element['subTask'].length + element['checkedSubtask'].length;
        element['tasksPercent'] = '';
        element['tasksPercent'] = element['checkedSubtask'].length / allTasks * 100;
    }
}

/**
 * update category to do
 */
function updateToDo(filteredTasks) {
    let todos;
    if (filteredTasks) { todos = filteredTasks.filter(t => t['progress'] == 'toDo') } else { todos = tasks.filter(t => t['progress'] == 'toDo') }

    document.getElementById('toDo').innerHTML = '';
    for (let i = 0; i < todos.length; i++) {
        let element = todos[i];
        let allTasks = element['subTask'].length + element['checkedSubtask'].length;
        document.getElementById('toDo').innerHTML += cardContent(element, allTasks);
    }
}

/**
 * update category in progress
 */
function updateInProgress(filteredTasks) {
    let inProgress;
    if (filteredTasks) { inProgress = filteredTasks.filter(t => t['progress'] == 'inProgress') } else { inProgress = tasks.filter(t => t['progress'] == 'inProgress') }

    document.getElementById('inProgress').innerHTML = '';
    for (let i = 0; i < inProgress.length; i++) {
        let element = inProgress[i];
        let allTasks = element['subTask'].length + element['checkedSubtask'].length;
        document.getElementById('inProgress').innerHTML += cardContent(element, allTasks);
    }
}

/**
 * update category awaiting feedback
 */
function updateAwaitingFeedback(filteredTasks) {
    let awaitingFeedbacks;
    if (filteredTasks) { awaitingFeedbacks = filteredTasks.filter(t => t['progress'] == 'awaitingFeedback') } else { awaitingFeedbacks = tasks.filter(t => t['progress'] == 'awaitingFeedback') }

    document.getElementById('awaitingFeedback').innerHTML = '';
    for (let i = 0; i < awaitingFeedbacks.length; i++) {
        let element = awaitingFeedbacks[i];
        let allTasks = element['subTask'].length + element['checkedSubtask'].length;
        document.getElementById('awaitingFeedback').innerHTML += cardContent(element, allTasks);
    }
}

/**
 * update category done
 */
function updateDone(filteredTasks) {
    let dones;
    if (filteredTasks) { dones = filteredTasks.filter(t => t['progress'] == 'done') } else { dones = tasks.filter(t => t['progress'] == 'done') }

    document.getElementById('done').innerHTML = '';
    for (let i = 0; i < dones.length; i++) {
        let element = dones[i];
        let allTasks = element['subTask'].length + element['checkedSubtask'].length;
        document.getElementById('done').innerHTML += cardContent(element, allTasks);
    }
}

/**
 * get information to start drag and drop
 * @param {number} id - id of tasks which start drag & drop
 */
function startDragging(id) {
    currentDraggedItem = id;
}

/**
 * update tasks after dragging
 */
function endDragging() {
    initBoard();
}

/**
 * need to allow drag & drop
 * @param {*} ev - event
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * update task category after dragging
 * @param {string} progress - category of task after dragging
 */
function drop(progress) {
    tasks[currentDraggedItem]['progress'] = progress;
    saveTasks();
    initBoard();
}

/**
 * fill in the category of every task
 */
async function fillInCategory() {
    await loadCategories();
    let categoryContainer;
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        let id = task['id'];
        let category = task['category'];
        categoryContainer = document.getElementById(`cardCategory${id}`);

        for (let j = 0; j < categories.length; j++) {
            const element = categories[j];
            if (category == element[['name']]) {
                let color = element['color'];
                categoryContainer.style.backgroundColor = color;
            }
        }
    }
}

/**
 * - fill in background-color in category container
 * @param {number} id - id of opened task
 */
async function fillInCategoryColorPopup(id) {
    await loadCategories();
    let categoryContainer = document.querySelector('.categorycard');
    let category = tasks[id]['category'];

    for (let j = 0; j < categories.length; j++) {
        const element = categories[j];
        if (category == element[['name']]) {
            let color = element['color'];
            categoryContainer.style.backgroundColor = color;
        }
    }
}

/**
 * clear the initials of assigned persons in every task
 */
function clearInitialContainer() {
    for (let i = 0; i < tasks.length; i++) {
        if (document.getElementById(`${i}`)) {
            let taskContainer = document.getElementById(`${i}`);
            let initialsContainer = taskContainer.children[4].children[0];
            initialsContainer.innerHTML = '';
        }
    }
}

/**
 * fill in the initials of assigned persons in every task
 */
function fillInAssinged() {
    clearInitialContainer();
    let highestId = getHighestId();
    for (let i = 0; i <= highestId; i++) {
        let ArrPosition = getPositionInTaks(i);
        if (document.getElementById(`${i}`)) {
            let taskContainer = document.getElementById(`${i}`);
            let initialsContainer = taskContainer.children[4].children[0];
            for (let j = 0; j < tasks[ArrPosition]['initials'].length; j++) {
                let initials = tasks[ArrPosition]['initials'][j];
                initialsContainer.innerHTML += assignHtml(j, initials);
            }
        }
    }
}

function getHighestId() {
    let ids = [];
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i]['id'];
        ids.push(element);
    }
    return (Math.max(...ids))
}

/**
 * render all progress to change in select tag
 */
function renderAllProgressTaskCard() {
    let select = document.getElementById('change_progress');
    select.innerHTML = '';
    select.innerHTML += changeProgressHtml();
}

/**
 * - change progress without drag & drop
 * @param {number} id - position in Array tasks
 */
function changeProgress(id) {
    let select = document.getElementById('change_progress');
    let task = tasks[id];
    task['progress'] = select.value;
}

/**
 * get the initials from a full name
 * @param {string} fullName - full name of contact
 * @returns - iniials from contact
 */
function getInitialsFromFullName(fullName) {
    let arr = fullName.split(" ");
    let firstName = arr[0].charAt(0);
    let secondName = arr[1].charAt(0);
    let initials = firstName + secondName;
    return initials;
}

/**
 * delete assigned person in the popup of edit task
 * @param {number} id - number of position of task in array, tasks
 * @param {number} i - number of position of person in array, assignedPerson
 */
function deleteAssignedPersonBoard(id, i) {
    tasks[id]['assignet'].splice(i, 1);
    tasks[id]['initials'].splice(i, 1);
    visualAssignedPersonEdit(id);
    saveTasks();
    initBoard();
}

/**
 * change the prio in edit task popup to urgent
 */
function changeUrgent() {
    document.getElementById('urgentimg').src = "img/urgentbutton.png";
    document.getElementById('mediumimg').src = "img/mediumbuttonwhite.png";
    document.getElementById('lowimg').src = "img/lowbuttonwhite.png";
    urgent = true;
    medium = false;
    low = false;
}

/**
 * change the prio in edit task popup to medium
 */
function changeMedium() {
    document.getElementById('mediumimg').src = "img/mediumbutton.png";
    document.getElementById('urgentimg').src = "img/urgentbuttonwhite.png";
    document.getElementById('lowimg').src = "img/lowbuttonwhite.png";
    urgent = false;
    medium = true;
    low = false;
}

/**
 * change the prio in edit task popup to low
 */
function changeLow() {
    document.getElementById('lowimg').src = "img/lowbutton.png";
    document.getElementById('mediumimg').src = "img/mediumbuttonwhite.png";
    document.getElementById('urgentimg').src = "img/urgentbuttonwhite.png";
    urgent = false;
    medium = false;
    low = true;
}

/**
 * - save the edited subtasks
 * @param {number} id - id of task
 */
function saveSubtasks(id) {
    let task = tasks[id];
    let subtasks = task['subTask'];
    let checkedSubtasks = task['checkedSubtask'];
    let subtasksLength = subtasks.length;
    let checkedSubtasksLength = checkedSubtasks.length;
    let checkbox;
    tasks[id]['subTask'] = [];
    tasks[id]['checkedSubtask'] = [];
    saveNotCheckedSubtasks(subtasksLength, id, checkbox);
    saveCheckedSubtasks(checkedSubtasksLength, id, checkbox);
}

/**
 * - save not cheked subtasks
 * @param {number} subtasksLength - length of all subtasks which are not checked from the task
 * @param {number} id - id of task
 * @param {input} checkbox - checkbox
 */
function saveNotCheckedSubtasks(subtasksLength, id, checkbox) {
    for (let i = 0; i < subtasksLength; i++) {
        checkbox = document.getElementById(`subtask_input${i}`);
        if (checkbox.checked) {
            tasks[id]['checkedSubtask'].push(checkbox.value);
        } else {
            tasks[id]['subTask'].push(checkbox.value);
        }
    }
}

/**
 * - save checked subtasks
 * @param {number} subtasksLength - length of all subtasks which are checked from the task
 * @param {number} id - id of task
 * @param {input} checkbox - checkbox
 */
function saveCheckedSubtasks(checkedSubtasksLength, id, checkbox) {
    for (let i = 0; i < checkedSubtasksLength; i++) {
        checkbox = document.getElementById(`checked_subtask_input${i}`);
        if (checkbox.checked) {
            tasks[id]['checkedSubtask'].push(checkbox.value);
        } else {
            tasks[id]['subTask'].push(checkbox.value);
        }
    }
}


/**
 * save changes in edit task 
 * @param {number} id - number of position of task in array, tasks
 */
function saveChanges(id) {
    let element = tasks[id]
    element['headline'] = document.getElementById(`title${id}`).value;
    element['description'] = document.getElementById(`description${id}`).value;
    element['dueDate'] = document.getElementById(`dueDate${id}`).value;

    if (urgent == true) {
        element['prio'] = 'urgent';
    }
    if (medium == true) {
        element['prio'] = 'medium';
    }
    if (low == true) {
        element['prio'] = 'low';
    }
}

/**
 * check and update progress bar in the tasks on the board page
 */
function checkProgressBar() {
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task['progress'] == 'toDo') {
            task['tasksDone'] = '0';
        } else if (task['progress'] == 'inProgress') {
            task['tasksDone'] = '1';
        } else if (task['progress'] == 'awaitingFeedback') {
            task['tasksDone'] = '2';
        } else {
            task['tasksDone'] = '3';
        }
    }
}

/**
 * filter task overview on board page by fill in search input
 * @param {*} event 
 */
function filterTask(event) {
    let emptyTaskSearchInput = document.getElementById('searchTasks');
    let searchString = event.target.value.toLowerCase();

    if (emptyTaskSearchInput.value == '') {
        initBoard();
    } else {
        let filteredTasks = tasks.filter((taskcard) => {
            return (
                taskcard['headline'].toLowerCase().includes(searchString) ||
                taskcard['category'].toLowerCase().includes(searchString) ||
                taskcard['prio'].toLowerCase().includes(searchString)
            );
        });
        updateToDo(filteredTasks);
        updateInProgress(filteredTasks);
        updateAwaitingFeedback(filteredTasks);
        updateDone(filteredTasks);
        fillInCategory();
        fillInAssinged();
    }
}

/**
 * animation to display a new task on board page
 */
async function animateNewTask() {
    newTask = JSON.parse(backend.getItem('newTask'));
    await backend.setItem('modyfiedTasks', JSON.stringify(tasks));
    if (newTask == true) {
        let taskId = tasks.length - 1;
        let taskContainer = document.getElementById(`${taskId}`);
        let containerId = tasks[taskId]['progress'];
        let id = document.getElementById(`${containerId}`);
        animationOfNewTask(id, taskId, taskContainer);
        newTask = false;
        taskContainer.classList.remove('new-task');
        await backend.setItem('newTask', JSON.stringify(newTask));
    }
}

function animationOfNewTask(id, taskId, taskContainer) {
    id.scrollTo({ top: id.scrollHeight, behavior: 'smooth' });
    if (!mediaforBoard768) {
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
    } else {
        document.getElementById(`${taskId}`).scrollIntoView();
    }
    setTimeout(() => {
        taskContainer.classList.add('new-task');
    }, "800");
}