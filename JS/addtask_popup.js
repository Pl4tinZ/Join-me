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
    document.querySelector('.blur_container').style = "filter: blur(5px);";
    document.querySelector('.profilebar').style = "filter: blur(5px);";
    document.querySelector('.menu').style = "filter: blur(5px);";
    document.querySelector('.blur_container').classList.add('hidden');
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
            document.querySelector('.blur_container').style = "filter: none;";
            document.querySelector('.blur_container').classList.remove('hidden');
            document.querySelector('.menu').style = "filter: none;";
            document.querySelector('.profilebar').style = "filter: none;";
            document.querySelector('.addtask_popup').style = "transform: translateX(100vw)";
            document.querySelector('.board_content').classList.remove('d-none');
            document.querySelector('.addtask_popup').style.position = 'absolute';
        }, 300);
    }
}

function loadAddTaskPopupWindow() {
    document.querySelector('.addtask_popup').innerHTML = addTaskPopupWindowContent();
}