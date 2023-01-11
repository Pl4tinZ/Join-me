// ------------------------------------------------------------------ Contacts ------------------------------------------------------------------ //

/**
 * add style propertys to open the new contact popup
 */
function openNewContactWindow() {
    document.getElementById('popupAddContact').classList.remove('d-none');
    document.getElementById('contactsContainer').style = "filter: blur(10px)";
    document.getElementById('popupAddContact').classList.add('popup_window_slidein');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        document.getElementById('popupAddContact').style = "transform: translateX(0vw)";
        document.querySelector('.popup').style.position = 'fixed';
    }, 300);
}

/**
 * remove style propertys to close the new contact popup
 * @param {string} succesAnimationContact - id of container for the success animation if contact was created
 */
function closeNewContactWindow(succesAnimationContact) {
    document.getElementById('popupAddContact').style = "animation: slideout 0.3s;"
    document.getElementById('popupAddContact').classList.remove('popup_window_slidein');
    document.getElementById('popupAddContact').classList.remove('popup_window_slidein');
    document.getElementById('popupAddContact').classList.add('popup_window_slideout');
    document.getElementById('contactsContainer').style = "filter: none;";
    document.body.style.overflow = 'unset';
    if (succesAnimationContact){succesAnimationContact.classList.add('d-none')}
    setTimeout(() => {
        document.getElementById('popupAddContact').classList.add('d-none');
        document.getElementById('contactsContainer').style = "filter: none;";
        document.getElementById('popupAddContact').style = "transform: translateX(100vw)";
        document.querySelector('.popup').style.position = 'absolute';
    }, 300);
}

/**
 * - show full contact info in mobile version
 * @param {number} i - number of position in contacts Array
 */
function showFullContactInfoMobile(i) {
    if(mediaforBoard.matches) {
        let contactInfoContainer = document.getElementById('cotact_info_mobile');
        let editBtn = document.getElementById('edit_btn');
        contactInfoContainer.classList.remove('d-none');
        contactInfoContainer.innerHTML = '';
        contactInfoContainer.innerHTML = contactInfoMobile(i);
        editBtn.src = 'img/edit button.png';
    }
}

/**
 * close popup of new contact in mobile version
 */
function closeContactInfoMobile() {
    let contactInfoContainer = document.getElementById('cotact_info_mobile');
    contactInfoContainer.classList.remove('d-none');
} 

/**
 * open the popup to edit contacts
 * @param {string} firstname - first name from input field
 * @param {string} lastname - second name from input field
 * @param {string} email - email from input field
 * @param {string} phone - phone number from input field
 * @param {number} id - number of position in contacs Array
 */
function editContactPopup(firstname, lastname, email, phone, id) {
    contactID = id;
    openEditContactPopup();
    fillInputfields(firstname, lastname, email, phone);
}

/**
 * open the popup to edit contact
 */
function openEditContactPopup() {
    document.getElementById('popupEditContact').classList.remove('d-none');
    document.getElementById('contactsContainer').style = "filter: blur(10px)";
    document.getElementById('popupEditContact').classList.add('popup_window_slidein');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        document.getElementById('popupEditContact').style = "transform: translateX(0vw)";
    }, 300);
}

/**
 * close the popup to edit contact
 * @param {string} succesAnimationContact - id of container for the success animation if contact was created
 */
function closeEditContactPopup(succesAnimationContact) {
    document.getElementById('popupEditContact').style = "animation: slideout 0.3s;"
    document.getElementById('popupEditContact').classList.remove('popup_window_slidein');
    document.getElementById('popupEditContact').classList.remove('popup_window_slidein');
    document.getElementById('popupEditContact').classList.add('popup_window_slideout');
    document.getElementById('contactsContainer').style = "filter: none;";
    document.body.style.overflow = 'unset';
    if(succesAnimationContact){succesAnimationContact.classList.add('d-none')}
    setTimeout(() => {
        document.getElementById('popupEditContact').classList.add('d-none');
        document.getElementById('contactsContainer').style = "filter: none;";
        document.getElementById('popupEditContact').style = "transform: translateX(100vw)";
    }, 300);
}

/**
 * fill the input fields from edit contact popup
 * @param {string} firstname - first name from input field
 * @param {string} secondname - second name from input field
 * @param {string} email - email from input field
 * @param {string} phone - phone number from input field
 */
function fillInputfields(firstname, lastname, email, phone) {
    let actuallyFirstName = document.getElementById('edited_firstname');
    let actuallySecondName = document.getElementById('edited_secondname');
    let actuallyEmail = document.getElementById('edited_email');
    let actuallyphoneNumber = document.getElementById('edited_phone');

    actuallyFirstName.value = firstname;
    actuallySecondName.value = lastname;
    actuallyEmail.value = email;
    actuallyphoneNumber.value = phone;
}


// ------------------------------------------------------------------ Add Task------------------------------------------------------------------ //

/**
 * open the popup to add a task
 * @param {string} progress - name of the selected progress 
 */
 function openAddTaskPopup(progress) {
    taskProgress = progress;
    document.querySelector('.addtask_popup').classList.remove('d-none');
    blurBackground();
    loadAddTaskPopupWindow();
    checkMediaforBoard(mediaforBoard);
    renderAddTask();
    document.querySelector('.addtask_popup').classList.add('popup_window_slidein');
    setTimeout(() => {
        document.querySelector('.addtask_popup').style = "transform: translateX(0vw)";
        document.querySelector('.addtask_popup').style.position = 'fixed';
    }, 300);
}

/**
 * close the add taask popup
 */
function closeAddTaskPopup() {
    if (document.querySelector('.addtask_popup')) {
        document.querySelector('.addtask_popup').style = "animation: slideout 0.3s;"
        document.querySelector('.addtask_popup').classList.remove('popup_window_slidein');
        setTimeout(() => {
            document.querySelector('.addtask_popup').classList.add('d-none');
            removeBlurBackground();
            document.querySelector('.addtask_popup').style = "transform: translateX(100vw)";
            document.querySelector('.board_content').classList.remove('d-none');
            document.querySelector('.addtask_popup').style.position = 'absolute';
        }, 300);
    }
}

/**
 * hide the backgroundparts
 */
function blurBackground() {
    document.querySelector('.blur_container').style = "filter: blur(5px);";
    document.querySelector('.profilebar').style = "filter: blur(5px);";
    document.querySelector('.menu').style = "filter: blur(5px);";
    document.querySelector('.blur_container').classList.add('hidden');
}

/**
 * show the backgroundparts
 */
function removeBlurBackground() {
    document.querySelector('.blur_container').style = "filter: none;";
    document.querySelector('.blur_container').classList.remove('hidden');
    document.querySelector('.menu').style = "filter: none;";
    document.querySelector('.profilebar').style = "filter: none;";
}

/**
 * succes animation onn add task popup if task created successful
 */
function successAnimationAddTaskPopup() {
    let succesAnimationPopup = document.getElementById('success_animation_popup');
    if (succesAnimationPopup) {
        succesAnimationPopup.classList.remove('d-none');
        setTimeout(() => {closeAddTaskPopup()}, "1300")  
    };
}

function loadAddTaskPopupWindow() {
    document.querySelector('.addtask_popup').innerHTML = addTaskPopupWindowContent();
}

// ------------------------------------------------------------------ Board ------------------------------------------------------------------ //

/**
 * open popup of task to see more informations
 * @param {number} id - number of position of task in array, tasks
 */
function openPopUp(id) {
    id = getPositionInTaks(id);
    blurBackground();
    document.getElementById('popUpArea').classList.remove('d-none');
    document.getElementById('boardContentParent').classList.add('hidden');
    document.getElementById('popUpArea').innerHTML = '';
    document.getElementById('popUpArea').innerHTML = popUpContent(id);
    checkMediaforBoard(mediaforBoard);
    fillInTaskAssignPopup(id);
    fillInCategoryColorPopup(id);
    fillInSubtasksPopup(id);
}

/**
 * close popup of task
 */
function closePopUp() {
    document.getElementById('popUpArea').classList.add('d-none');
    document.querySelector('.board_content').classList.remove('d-none');
    document.getElementById('boardContentParent').classList.remove('hidden');
    removeBlurBackground();
}

/**
 * open popup of task to edit it
 * @param {number} id - number of position of task in array, tasks
 */
function openPopUpEdit(id) {
    document.getElementById('popUpArea').innerHTML = '';
    document.getElementById('popUpArea').innerHTML = popUpEditContent(id);
    renderEditTaskCard(id);
    renderAllProgressTaskCard(id);
    visualAssignedPersonEdit(id);
    fillInSubtasksPopupEdit(id);
}

/**
 * - render the subtasks in task card
 * @param {number} id - number of position of task in array, tasks
 */
function fillInSubtasksPopup(id) {
    let subtasks = tasks[id]['subTask'];
    let checkedSubtasks = tasks[id]['checkedSubtask'];
    let subtaskContainer = document.getElementById('subtasks_popup');
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        subtaskContainer.innerHTML += subTaksContentPopup(i, subtask);
    }
    for (let i = 0; i < checkedSubtasks.length; i++) {
        const checkedSubtask = checkedSubtasks[i];
        subtaskContainer.innerHTML += subTaksContentPopupChecked(i, checkedSubtask);
    }
    checkTheCheckbox();
}

/**
 * - render the subtasks in task card edit
 * @param {number} id - number of position of task in array, tasks
 */
function fillInSubtasksPopupEdit(id) {
    let subtasks = tasks[id]['subTask'];
    let checkedSubtasks = tasks[id]['checkedSubtask'];
    let subtaskContainer = document.getElementById('subtasks_popup_edit');
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        subtaskContainer.innerHTML += subTaksContentPopupEdit(i, subtask);
    }
    for (let i = 0; i < checkedSubtasks.length; i++) {
        const checkedSubtask = checkedSubtasks[i];
        subtaskContainer.innerHTML += subTaksContentPopupCheckedEdit(i, checkedSubtask);
    }
    checkTheCheckbox();
}

/**
 * check if checkboxes are checked or not
 */
function checkTheCheckbox() {
    let checkedElements = document.querySelectorAll('.checked');

    for (let i = 0; i < checkedElements.length; i++) {
        const element = checkedElements[i];
        element.checked = true;
    }
}

/**
 * wiggle animation for trying edit task in the wrong popup
 */
function wiggleEditBtn() {
    document.querySelector('.edit_btn').animate(
        [
            { transform: 'scale(1)' },
            { transform: 'scale(1.1)' },
            { transform: 'scale(1)' }
        ],
        {
            duration: 200,
            iterations: 3,
            direction: 'alternate'
        }
    );
}

/**
 * clear the initials of assigned persons in every task in the popup
 */
function clearInitialContainerTaskPopup() {
    let taskAssign = document.getElementById('taskAssignContainer');
    taskAssign.innerHTML = '';
}

/**
 * fill in the initials of assigned persons in every task in the popup
 */
function fillInTaskAssignPopup(id) {
    let taskAssign = document.getElementById('taskAssignContainer');
    clearInitialContainerTaskPopup();
    for (let i = 0; i < tasks[id]['assignet'].length; i++) {
        let initials = tasks[id]['initials'][i];
        let fullName = tasks[id]['assignet'][i];
        taskAssign.innerHTML += assignPopupHtml(initials, fullName);
    }
}

/**
 * get all informations for edit task
 */
function renderEditTaskCard() {
    let select = document.getElementById('select_assign_edit');
    select.innerHTML = '';
    sortContacts();

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        select.innerHTML += editTaskSelectHtml(contact, i);
    }
}

/**
 * render all assigned persons for edit task popup
 * @param {number} i - number of position of task in array, tasks
 */
function addAssignEdit(i) {
    let option = document.getElementById('select_assign_edit');

    if (!assignedPersons.includes(option.value)) {
        let initials = getInitialsFromFullName(option.value);
        assignedPersons.push(option.value);
        tasks[i]['assignet'].push(option.value);
        tasks[i]['initials'].push(initials);
        visualAssignedPersonEdit(i);
    }
}

/**
 * visualisieze all assigned contacts in edit task
 * @param {number} id - number of position of task in array, tasks
 */
function visualAssignedPersonEdit(id) {
    let container = document.getElementById('visual_assign_edit');
    let assignedPerson = tasks[id]['assignet'];
    container.innerHTML = '';
    for (let i = 0; i < assignedPerson.length; i++) {
        const person = assignedPerson[i];
        container.innerHTML += assignEditHtml(id, i, person);
    }
}

/**
 * save all new specifications to server if click the 'ok'-button in edit task popup
 * @param {number} id - number of position of task in array, tasks
 */
async function popUpEditSave(id) {
    saveChanges(id);
    saveSubtasks(id);
    successAnimationEditTaskPopup();
    await saveTasks();
    initBoard();
}

/**
 * animation for successfull change task specifications
 */
function successAnimationEditTaskPopup() {
    let succesAnimationPopup = document.getElementById('success_animation_edit_popup');
    if (succesAnimationPopup) {
        succesAnimationPopup.classList.remove('d-none');
        setTimeout(() => { closePopUp(succesAnimationPopup) }, "1300")
    };
}