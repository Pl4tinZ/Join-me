/**
 * render add task page, fill in options for inputs
 */
async function renderAddTask() {
    await downloadFromServer();
    checkIfLogged();
    loadTasks();
    loadCategories();
    renderSelectsAddTask();
}

/**
 * - fill in the select tags with categorys and contacts
 */
function renderSelectsAddTask() {
    let select = document.getElementById('select_assign');
    let selectCategory = document.getElementById('category');
    select.innerHTML = '';
    selectCategory.innerHTML = '';
    sortContacts();
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        select.innerHTML += displayContactsforInput(contact, i);
    }
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i]['name'];
        selectCategory.innerHTML += displayCategoriesForInput(category);
    }
}

/**
 * add a person to the task 
 * @param {number} i - position in contatcs Array
 */
function addAssign(i) {
    let option = document.getElementById('select_assign');
    if(!assignedPersons.includes(option.value)){
        assignedPersons.push(option.value);
        visualAssignedPerson();
    }
}

/**
 * display all persons who was added to the task
 */
function visualAssignedPerson() {
    let container = document.getElementById('visual_assign');
    container.innerHTML = '';
    for (let i = 0; i < assignedPersons.length; i++) {
        const person = assignedPersons[i];
        container.innerHTML += visualPersonHtml(i, person);
    }
}

/**
 * delete a person from the task 
 * @param {number} i - position in contatcs Array
 */
function deleteAssignedPerson(i) {
    let select = document.getElementById(`assigned_person${i}`).innerHTML;
    let index = assignedPersons.indexOf(select, 0);
    assignedPersons.splice(index, 1);
    visualAssignedPerson();
    saveTasks();
}

/**
 * add a subtask to the task
 */
function addSubTask() {
    let subtasks = document.getElementById('newSubtask');
    if (!subtasks.value == '') {subtask.push(subtasks.value)};
    subtasks.value = '';
    document.getElementById('subtask').innerHTML = '';
    for (let i = 0; i < subtask.length; i++) {
        document.getElementById('subtask').innerHTML += subtaskHtml(i);
    }
}

/**
 * create new task
 */
async function createTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let assign = document.getElementById('select_assign');
    let date = document.getElementById('date');
    let category = checkCategoryInput();
    let taskCard;
    if (!checkInputs(title, date)) {
        checkIfNewCategory(category);
        checkWhichIdIsFree();
        getInitialsFromContacts();
        taskCard = createNewTaskCard(title, description, date, category, taskCard);
        tasks.push(taskCard);
        clearInputFieldsAddTask(title, description, category, assign, date);
        successAnimationAddTask();
        successAnimationAddTaskPopup();
        await saveTasks();
        newTask = true;
        await backend.setItem('newTask', JSON.stringify(newTask));
        assignedPersons = [];
        setTimeout(() => {
            location.href = 'board.html';
        }, "1000")  
    }
}

function createNewTaskCard(title, description, date, category, taskCard) {
    taskCard = {
        "title": title.value,
        "description": description.value,
        "id": globalIdForTaskCard,
        "progress": taskProgress,
        "category": category,
        "date": date.value,
        "headline": title.value,
        "description": description.value,
        "dueDate": date.value,
        "prio": prio,
        "subTask": subtask,
        "checkedSubtask": [],
        "tasksOverall": 3,
        "tasksDone": 0,
        "tasksPercent": '',
        "assignet": assignedPersons,
        "initials": initialsForTaskCard,
    }
    return taskCard;
}

/**
 * succes animation on add task page if task created successful
 */
function successAnimationAddTask() {
    let succesAnimation = document.getElementById('success_animation');
    if (succesAnimation) {
        succesAnimation.classList.remove('d-none')
    }
}

/**
 * save tasks Array to server
 */
async function saveTasks() {
    await backend.setItem('modyfiedTasks', JSON.stringify(tasks));
}

/**
 * load tasks Array from server
 */
function loadTasks() {
    tasks = JSON.parse(backend.getItem('modyfiedTasks')) || [];
}

/**
 * save categories Array to server
 */
async function saveCategories() {
    await backend.setItem('categories', JSON.stringify(categories));
}

/**
 * load categories Array from server
 */
function loadCategories() {
    categories = JSON.parse(backend.getItem('categories')) || [];
}

/**
 * clear input fields after succesfull added task on add task page
 * @param {string} title - title of task
 * @param {string} description - description of task
 * @param {string} category - category of task
 * @param {string} assign - assign input
 * @param {string} date - date input
 */
function clearInputFieldsAddTask(title, description, category, assign, date) {
    title.value = '';
    description.value = '';
    category.value = '';
    assign.value = '';
    date.value = '';
}

/**
 * get initials from contact from Array to create Task
 */
function getInitialsFromContacts() {
    for (let i = 0; i < assignedPersons.length; i++) {
        const assignedPerson = assignedPersons[i];
        for (let j = 0; j < contacts.length; j++) {
            const contact = contacts[j];
            if(assignedPerson == contact['full_name']) {
                initialsForTaskCard.push(contact['initials'])
            }
        }
    }
}

/**
 * get a new unique id for Task
 */
function checkWhichIdIsFree() {
    globalIdForTaskCard = 0;
    let match = false;
    match = getId(match);
}

/**
 * - generate ID
 * @param {boolean} match - for new ID
 */
function getId(match) {
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        if (globalIdForTaskCard == element['id']) {
            match = true;
        }
    }
    
    if (match) {
        globalIdForTaskCard++;
        match = false;
        getId(match)
    }
}

/**
 * switch the image of selected prio to urgent
 */
function changeImgUrgent() {
    document.getElementById('urgent').src = "img/urgentbutton.png";
    document.getElementById('medium').src = "img/mediumbuttonwhite.png";
    document.getElementById('low').src = "img/lowbuttonwhite.png";

    document.getElementById('urgent').classList.add('active');
    document.getElementById('medium').classList.remove('active');
    document.getElementById('low').classList.remove('active');
    prio = 'urgent';
}

/**
 * switch the image of selected prio to medium
 */
function changeImgMedium() {
    document.getElementById('medium').src = "img/mediumbutton.png";
    document.getElementById('urgent').src = "img/urgentbuttonwhite.png";
    document.getElementById('low').src = "img/lowbuttonwhite.png";

    document.getElementById('medium').classList.add('active');
    document.getElementById('urgent').classList.remove('active');
    document.getElementById('low').classList.remove('active');
    prio = 'medium';
}

/**
 * switch the image of selected prio to low
 */
function changeImgLow() {
    document.getElementById('low').src = "img/lowbutton.png";
    document.getElementById('medium').src = "img/mediumbuttonwhite.png";
    document.getElementById('urgent').src = "img/urgentbuttonwhite.png";

    document.getElementById('low').classList.add('active');
    document.getElementById('medium').classList.remove('active');
    document.getElementById('urgent').classList.remove('active');
    prio = 'low';
}

/**
 * clear all inputs on add task page
 */
function clearAddTask() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('select_assign').value = '';
    document.getElementById('date').value = '';
    document.getElementById('date').value = '';
    document.getElementById('low').src = "img/lowbuttonwhite.png";
    document.getElementById('medium').src = "img/mediumbuttonwhite.png";
    document.getElementById('urgent').src = "img/urgentbuttonwhite.png";
    document.getElementById('visual_assign').innerHTML = '';
    assignedPersons = [];
}

/**
 * check if media of window >992px
 * @param {*} mediaforBoard 
 */
function checkMediaforBoard(mediaforBoard) {
    if (document.querySelector('.board_content')) {
        if (mediaforBoard.matches) {
                document.querySelector('.board_content').classList.add('d-none');
            } else {
                document.querySelector('.board_content').classList.remove('d-none');
            }
    }
}

/**
 * check if new category selectet and display a new input if it's selected
 */
function checkCategory() {
    let category = document.getElementById('category');
    let newCategoryContainer = document.getElementById('new_category_container');
    if (category.value == 'New Category') {
        newCategoryContainer.classList.remove('dNone');
        newCategory = true;
    } else {
        newCategoryContainer.classList.add('dNone');
        newCategory = false;
    }
}

/**
 * get the value of category or new category
 * @returns - ovalue of the category
 */
function checkCategoryInput() {
    let category
    if (document.getElementById('new_category_container').classList.contains('dNone')) {
        category = document.getElementById('category').value;
    } else {
        category = document.getElementById('new_category').value;
    }
    return category
}

/**
 * check if user selected a new category
 * @param {string} category - value of input in add task
 */
function checkIfNewCategory(category) {
    let getNoCategory = false
    for (let i = 0; i < categories.length; i++) {
        const element = categories[i]['name'];
        if (element == category) {
            getNoCategory = true;
          } 
    }
    if (getNoCategory == false){
        getNewCategory();
    }
}

/**
 * create a new category, push in Array and save on server
 */
async function getNewCategory() {
    let category = document.getElementById('new_category');
    let color = document.getElementById('color_picker');
    categories.push({
        "name": category.value,
        "color": color.value,
    })
    saveCategories();
}

/**
 * - delete task
 * @param {number} id - number of Position in Array Tasks
 */
function deleteTask(id) {
    tasks.splice(id, 1);
    saveTasks();
    closePopUp();
    initBoard();
}

/**
 * - get position from task in Array by comparing the id's
 * @param {number} id - id of selected or openend element
 * @returns - position in Array
 */
function getPositionInTaks(id) {
    let position;
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task['id'] == id) {
            position = i;
        }
    }
    return position;
}

/**
 * validation for inputs add task
 * @param {string} title - title of task
 * @param {string} date - deadline of task
 * @returns - boolean if every important input are filled or not
 */
function checkInputs(title, date) {
    let assign = document.getElementById('visual_assign');
    let urgentBtn = document.getElementById('urgent');
    let mediumBtn = document.getElementById('medium');
    let lowBtn = document.getElementById('low');
    let emptyInput = true;
    let emptyPrio = true;
    let empty = true;

    if (title.value == '') {
        title.classList.add('empty');
    } else {
        title.classList.remove('empty');
    }
    if (date.value == '') {
        date.classList.add('empty');
    } else {
        date.classList.remove('empty');
    }
    if (assign.innerHTML == '') {
        document.getElementById('select_assign').classList.add('empty');
    } else {
        document.getElementById('select_assign').classList.remove('empty')
    }
    if (urgentBtn.classList.contains('active') || mediumBtn.classList.contains('active') || lowBtn.classList.contains('active')) {
        document.getElementById('devision').classList.remove('empty');
    } else {
        document.getElementById('devision').classList.add('empty');
    }
    if (!title.value == '' && !date.value == '' && !assign.innerHTML == '') {
        emptyInput = false;
    } else {
        emptyInput = true;
    }
    if (urgentBtn.classList.contains('active') || mediumBtn.classList.contains('active') || lowBtn.classList.contains('active')) {
        emptyPrio = false;
    } else {
        emptyPrio = true;
    }
    if (!emptyInput && !emptyPrio) {
        empty = false
    }
    return empty;
}