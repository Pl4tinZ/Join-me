// ------------------------------------------------------------------------ addContact ------------------------------------------------------------------------ //

/**
 * render contact information details
 * @param {number} i - number of position in array, contacs
 * @returns - HTML
 */
function contactInfo(i) {
    let contact = contacts[i];

    return /*html*/`
        <div class="full_contact_info">
            <h2 style="background-color:${getColorForName(contact['initials'])}">${contact['initials']}</h2>
            <div class="contact_info_add_task">
                <h1>${contact['first_name']} ${contact['second_name']}</h1>
                <p onclick="openAddTaskPopup('toDo')" style="cursor: pointer;">+ Add Task</p>
            </div>
        </div>
        <div class="contact_information_header">
            <h2>Contact Information</h2>
            <div class="edit_contact" onclick="editContactPopup('${contact['first_name']}', '${contact['second_name']}', '${contact['email']}', '${contact['phone']}', '${i}')">
                <img src="img/pencil.png">
                <p>Edit Contact</p>
            </div>
        </div>
        <div class="contact_information">
            <h2>Email</h2>
            <a href="#">
                <p>${contact['email']}</p>
            </a>
            <h2>Phone</h2>
            <p>${contact['phone']}</p>
        </div>`;
}


function contactInfoMobile(i) {
    let contact = contacts[i];

    return /*html*/`
    <span class="tool_description">Kanban Project Management Tool</span>
    <div class="contact_headline"><h1>Contacts</h1></div>
    <div class="subline">
        <span>Better with a team</span>
        <img src="img/underline.png">
    </div>
    <div class="full_contact_info">
        <h2 style="background-color:${getColorForName(contact['initials'])}">${contact['initials']}</h2>
        <div class="contact_info_add_task">
            <h1>${contact['first_name']} ${contact['second_name']}</h1>
            <p onclick="openAddTaskPopup('toDo')" style="cursor: pointer;">+ Add Task</p>
        </div>
    </div>
    <div class="contact_information_header">
        <h2>Contact Information</h2>
        <div class="edit_contact" onclick="editContactPopup('${contact['first_name']}', '${contact['second_name']}', '${contact['email']}', '${contact['phone']}', '${i}')">
            <img id="edit_btn" src="img/edit button.png">
            <p>Edit Contact</p>
        </div>
    </div>
    <div class="contact_information">
        <h2>Email</h2>
        <a href="#">
            <p>${contact['email']}</p>
        </a>
        <h2>Phone</h2>
        <p>${contact['phone']}</p>
    </div>
    <div class="exit_contact_info">
        <img src="img/clear.png" onclick="closeContactInfoMobile()">
    </div>`;    
}

/**
 * renders contact where no second contact exists with the same initial letter
 * @param {number} i - number of position in array, contacs
 * @param {string} initials - initials of the chosen contact
 * @param {string} firstsecondnameLetter - the first letter of the second name
 * @returns - HTML
 */
function letterNotExist(i, initials, firstsecondnameLetter) {
    return /*html*/`
    <div>
        <div class="first_name_letter">
            <h3>${firstsecondnameLetter}</h3>
            <img src="img/line.png">
        </div>
        <div id="${firstsecondnameLetter}">
            <div class="full_listner">
                <div class="contact_name_container" onclick="showFullContactInfo(${i}); showFullContactInfoMobile(${i});">
                    <span style="background-color:${getColorForName(initials)}">${initials}</span>
                    <div class="contact_name">
                    <h3>${contacts[i]['first_name']} ${contacts[i]['second_name']}</h3>
                    <a href="#"><p>${contacts[i]['email']}</p></a>
                    </div>
                </div>
                <p style="font-size: 40px !important; margin: 0px">|</p>
                <img src="img/trash-can.png" onclick="removeContact(${i})">
            </div>
        </div>
    </div>`
}

/**
 * renders contact where already second contact exists with the same initial letter
 * @param {number} i - number of position in array, contacs
 * @param {string} initials - initials of the chosen contact
 * @returns - HTML
 */
function letterAlreadyExist(i, initials) {
    return /*html*/`
    <div class="full_listner">
        <div class="contact_name_container" onclick="showFullContactInfo(${i}); showFullContactInfoMobile(${i});">
            <span style="background-color:${getColorForName(initials)}">${initials}</span>
            <div class="contact_name">
            <h3>${contacts[i]['first_name']} ${contacts[i]['second_name']}</h3>
            <a href="#"><p>${contacts[i]['email']}</p></a>
            </div>
        </div>
        <p style="font-size: 40px !important; margin: 0px">|</p>
        <img src="img/trash-can.png" onclick="removeContact(${i})">
    </div>`
}


// ------------------------------------------------------------------------ addTask ------------------------------------------------------------------------ //

/**
 * - push all contacts to the select input in the task
 * @param {string} contact - chosen contact
 * @param {number} i - number of position from the contact in the array, contacts
 * @returns - HTML
 */
function displayContactsforInput(contact, i) {
    return /*html*/`<option value="${contact['first_name']} ${contact['second_name']}" onchange="addAssign()" id="option${i}"><div class="test">${contact['first_name']} ${contact['second_name']}</div></option>`
}

/**
 * - push all contacts to the select input in the task
 * @param {string} category - every category generated by for loop
 * @returns - HTML
 */
function displayCategoriesForInput(category) {
    return /*html*/`<option>${category}</option>`
}

/**
 * displays all assigned persons for the chosen task
 * @param {number} i  - number of position from the assigned person in the array, tasks
 * @param {string} person - chosen person 
 * @returns - HTML
 */
function visualPersonHtml(i, person) {
    return /*html*/`
    <div class="assigned_person">
        <span id="assigned_person${i}">${person}</span>
        <b class="delete_btn_assigned_person" onclick="deleteAssignedPerson(${i})">x<b>
    </div>`
}

/**
 * content for the add task popup
 * @returns - HTML
 */
function addTaskPopupWindowContent() {
    return /*html*/ `

<div class="tasks_popup">
    <h1>Add Task</h1>
    <div class="close_addtask_popup" id="closeAddTaskWindow" onclick="closeAddTaskPopup()">
            <img src="img/clear.png">
        </div>
    <div class="tasks_content">
        <div class="left_task">
            <div class="title">
                <p>Title*</p>
                <input type="text" placeholder="Enter a title" id="title" required>
            </div>
            <div class="description">
                <p>Description</p>
                <textarea type="text" placeholder="Enter a description" id="description"></textarea>
            </div>
            <div class="margin-top50">
                <p>Category</p>
            </div>
            <select class="select_task" id="category" placeholder="Select task category" required onchange="checkCategory()">
                <!-- JAVASCRIPT -->
            </select>
            <div class="new_category_container dNone" id="new_category_container">
                <input class="new_category_input" id="new_category" placeholder="Type in new category">
                <input id="color_picker" type="color">
            </div>
            <div class="margin-top50">
                <p>Assigned to*</p>
            </div>
            <select class="select_assign" id="select_assign" placeholder="Assignet to" onchange="addAssign()" required>
                <!-- JAVASCRIPT -->
            </select>
            <div class="visual_assign" id="visual_assign"></div>
        </div>
        <div class="bar">
            <img src="img/bar.png">
        </div>
        <div class="right-task">
            <div class="date">
                <p>Due date*</p>
                <input type="date" placeholder="dd/mm/yyyy" id="date" required>
            </div>
            <div class="prio">
                <p>Prio*</p>
                <div class="devision" id="devision">
                    <div onclick="changeImgUrgent()" class="urgent"><img id="urgent" src="img/Urgentbuttonwhite.png"></div>
                    <div onclick="changeImgMedium()" class="medium"><img id="medium" src="img/mediumbuttonwhite.png"></div>
                    <div onclick="changeImgLow()" class="low"><img id="low" src="img/lowbuttonwhite.png"></div>
                </div>
            </div>
                <div class="subtask_container">
                <p class="subtaskheader">Subtasks</p>
                <div class="subtask">
                    <input type="text" id="newSubtask" placeholder="Add new subtask"><img src="img/addsubtask.png" id="addTask" onclick="addSubTask()">
                </div>
                <div class="subtasks" id="subtask">
                    
                </div>
            </div>
        </div>
    </div>
    <div class="task_buttons" id="task_buttons">
        <button class="clear_button" id="clearButton" onclick="clearAddTask()">Clear<img
                src="img/clear.png"></button>
        <button class="create_button" id="createButton" onclick="createTask()">Create Task <img
                src="img/create_task.png"></button>
    </div>
    <div class="wrapper d-none" id="success_animation_popup"> 
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> 
            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> 
            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
    </div>
</div>
`
}

/**
 * content of the subtasks on the add task page
 * @param {number} i  - number of position from the task in the array, tasks
 * @returns - HTML
 */
function subtaskHtml(i) {
    return /*html*/`<div>${subtask[i]}</div>`;
}

// ------------------------------------------------------------------------ board ------------------------------------------------------------------------ //

/**
 * content of the task on board page
 * @param {number} Element - number of the task in the array, tasks
 * @returns - HTML
 */
function cardContent(Element, allTasks) {
    return /*html*/`
    <div id="${Element['id']}" onclick="openPopUp(${Element['id']})" draggable="true" ondragstart="startDragging(${Element['id']})"
        ondragend="endDragging()" class="task_card">
        <span class="card_category" id="cardCategory${Element['id']}">
            ${Element['category']}
        </span>
        <span class="card_headline">
            ${Element['headline']}
        </span>
        <span class="card_description">
            ${Element['description']}
        </span>
        <div class="board_progress_row">
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${Element['tasksPercent']}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="board_progress">
                ${Element['checkedSubtask'].length}/${allTasks} Done
            </div>
        </div>
        <div class="assinged_contacts_row">
            <div class="initials_contacts">
                
            </div>
            <div class="urgency_icon">
                <img src="img/${Element['prio']}.png">
            </div>
        </div>
    </div>
    `;
}

/**
 * detail info of the task
 * @param {number} id - number of position in the array, tasks
 * @returns - HTML
 */
function popUpContent(id) {
    element = tasks[id];
    return /*html*/`
    <div class="dragcard_popup" id="dragcard_popup">
        <div class="categorycard">
            <p>${element['category']}</p>
        </div>
        <div onclick="closePopUp()" class="closebutton">
            <img src="img/clear.png">
        </div>
        <div class="headerdescription">
            <h1>${element['headline']}</h1>
        </div>
        <div class="description_dragcard_pupup">
            <p>${element['description']}</p>
        </div>
        <div class="dragcard_popup_frame_1">
            <h2>Due date:</h2>
            <p id="dueDate">${element['dueDate']}</p>
        </div>
        <div class="dragcard_popup_frame_2">
            <h2>Priority:</h2>
            <img src="img/${element['prio']}button.png">
        </div>
        <div class="dragcard_popup_frame_3">
            <h2>Assigned To:</h2>
        </div>
        <div class="dragcard_popup_frame_4" id="dragcardPopupListning">
            <div class="underframe1" id="taskAssignContainer">
                 <!-- JAVASCRIPT fillInTaskAssignPopup   -->
            </div>
        </div>
        <div class="subtasks_popup" id="subtasks_popup">
            <h2>Subtasks:</h2>
            <!-- JAVASCRIPT fillInSubtasksPopup   -->
        </div>
        <div onclick="openPopUpEdit(${id})" class="edit_button_dragcard_popup">
            <img class="edit_btn" src="img/edit button.png">
        </div>
        <div class="delete_task">
            <hr>
            <span onclick="deleteTask(${id})">Delete task</span>
        </div>
    </div>
    `;
}

function subTaksContentPopup(i, subtask) {
    return /*html*/`
    <div id="subtask${i}">
        <input id="subtask_input${i}" type="checkbox" onclick="wiggleEditBtn(); return false"> 
        <span>${subtask}</span>
    </div>`
}

function subTaksContentPopupChecked(i, checkedSubtask) {
    return /*html*/`
    <div id="checkedSubtask${i}">
        <input class="checked" id="checked_subtask_input${i}" type="checkbox" onclick="wiggleEditBtn(); return false"> 
        <span>${checkedSubtask}</span>
    </div>`
}

function subTaksContentPopupEdit(i, subtask) {
    return /*html*/`
    <div id="subtaskEdit${i}" class="subtask_edit">
        <input value="${subtask}" id="subtask_input${i}" type="checkbox" onclick=""> 
        <span>${subtask}</span>
    </div>`
}

function subTaksContentPopupCheckedEdit(i, checkedSubtask) {
    return /*html*/`
    <div id="checkedSubtaskEdit${i}" class="subtask_edit">
        <input value="${checkedSubtask}" class="checked" id="checked_subtask_input${i}" type="checkbox"> 
        <span>${checkedSubtask}</span>
    </div>`
}

/**
 * - content of assignets person in task of board page
 * @param {number} j - number of position in the array, tasks
 * @param {string} initials - initials of the contact, generatet by for loop
 * @returns - HTML
 */
function assignHtml(j, initials) {
    return /*html*/`<div class="assinged_contacts" id="assinged_contacts${j+1}" style="background-color:${getColorForName(initials)}">${initials}</div>`
}

/**
 * - content of assignets person in task in detail information of task
 * @param {string} initials  - initials of the contact, generatet by for loop
 * @param {string} fullName  - first name and second name of the contact, generatet by for loop
 * @returns - HTML
 */
function assignPopupHtml(initials, fullName) {
    return/*html*/`
        <div class="assign_container_popup">
            <div style="background-color:${getColorForName(initials)}">
                <h4 >${initials}</h4>
            </div>
            <p>${fullName}</p>
        </div>
        `;
}

/**
 * content of the edit task page
 * @param {number} id - number of position in the array, tasks
 * @returns - HTML
 */
function popUpEditContent(id) {
    element = tasks[id];
    return /*html*/`
    <div class="task_popup_window_2">
        <div onclick="closePopUp()" class="closebutton">
            <img src="img/clear.png">
        </div>
        <div class="task_popup_window_2_title task_popup_window_2_container">
            <h3>Title</h3>
            <input id="title${id}" value="${element['headline']}" type="text" placeholder="Title....">
        </div>
        <div class="task_popup_window_2_description task_popup_window_2_container">
            <h3>Description</h3>
            <textarea id="description${id}" cols="30" rows="10" placeholder="Description....">${element['description']}</textarea>
        </div>
        <div class="task_popup_window_2_date task_popup_window_2_container">
            <h3>Due date</h3>
            <input id="dueDate${id}" value="${element['dueDate']}" type="date">
        </div>
        <div class="task_popup_window_2_prio task_popup_window_2_container">
            <h3>Prio</h3>
            <div class="task_popup_window_2_prio_images">
                <div onclick="changeUrgent(${id})"><img src="img/Urgentbuttonwhite.png" id="urgentimg"></div>
                <div onclick="changeMedium(${id})"><img src="img/mediumbuttonwhite.png" id="mediumimg"></div>
                <div onclick="changeLow(${id})"><img src="img/lowbuttonwhite.png" id="lowimg"></div>
            </div>
        </div>
        <div class="change_progress_container">
            <div class="task_popup_window_2_container task_popup_window_2_progress">
                <h3>Change progress</h3>
                <select id="change_progress" class="change_progess_select" onchange='changeProgress(${id})'>
                    <!-- JAVASCRIPT renderAllProgressTaskCard -->
                </select>
            </div>
        </div>
        <div class="task_popup_window_2_assign task_popup_window_2_container">
            <h3>Assigned to</h3>
            <select class="select_assign" id="select_assign_edit" onchange="addAssignEdit(${id})">
                <!-- JAVASCRIPT renderEditTaskCard -->
            </select>
            <div class="visual_assign" id="visual_assign_edit">
                <!-- JAVASCRIPT visualAssignedPerson -->
            </div>
        </div>
        <div class="task_popup_window_2_container" id="subtasks_popup_edit">
            <h3>Subtasks</h3>
            <!-- JAVASCRIPT fillInSubtasksPopupEdit   -->
        </div>
        <div onclick="popUpEditSave(${id})"class="accept_button">
            <img src="img/Primary check button V1.png">
        </div>
        <div class="wrapper d-none" id="success_animation_edit_popup"> 
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> 
                <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> 
                <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
        </div>
    </div>
    `;
}

function changeProgressHtml() {
    return /*html*/`
    <option value="toDo">To do</option>
    <option value="inProgress">In progress</option>
    <option value="awaitingFeedback">Awaiting feedback</option>
    <option value="done">Done</option>`
}

/**
 * - push all contacts to the select input in the task on edit page
 * @param {string} contact - chosen contact
 * @param {number} i - number of position from the contact in the array, contacts
 * @returns - HTML
 */
function editTaskSelectHtml(contact, i) {
    return /*html*/`<option value="${contact['first_name']} ${contact['second_name']}" id="option${i}"><div class="test">${contact['first_name']} ${contact['second_name']}</div></option>`
}

/**
 * - displays all assigned persons for the chosen task
 * @param {*} id  - number of position in the array, tasks
 * @param {*} i  - number of position from the assigned person in the array, tasks
 * @param {string} person  - chosen person 
 * @returns - HTML
 */
function assignEditHtml (id, i, person) {
    return /*html*/`
        <div class="assigned_person">
            <span id="assigned_person${i}">${person}</span>
            <b class="delete_btn_assigned_person" onclick="deleteAssignedPersonBoard(${id}, ${i})">x<b>
        </div>`
}