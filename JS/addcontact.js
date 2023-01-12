/**
 * initialize and rener contact page
 */
async function getInfoFromNewContactField() {
    checkIfLogged();
    await downloadFromServer();
    await loadContacts();
    renderContacts();
    checkMediaforExitButton(mediaForContact);
}

/**
 * add a new contact
 */
function addContact() {
    let firstname = document.getElementById('firstname');
    let secondname = document.getElementById('secondname');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let initials = (firstname.value.charAt(0) + secondname.value.charAt(0)).toUpperCase();
    let contactInfo;
    if (!checkContactInputs(firstname, secondname) && checkPhoneNumber() && checkEmail()) {
        contactInfo = createContactInfo(firstname, secondname, email, phone, initials, contactInfo);
        contacts.push(contactInfo);
        clearInputFieldsAddTask(firstname, secondname, email, phone);
        successAnimationForNewContact();
        saveContacts();
        renderContacts();
        checkMediaforExitButton(mediaForContact);
    }
}

/**
 * - create a variable with all information from new contact field
 * @param {string} firstname - first name of new contact
 * @param {string} secondname - second name of new contact
 * @param {string} email - email of new contact
 * @param {number} phone - phone number of new contact
 * @param {string} initials - initials of new contact
 * @param {variable} contactInfo - variable with all these informations
 * @returns 
 */
function createContactInfo(firstname, secondname, email, phone, initials, contactInfo) {
    contactInfo = {
        "first_name": firstname.value.charAt(0).toUpperCase() + firstname.value.slice(1),
        "second_name": secondname.value.charAt(0).toUpperCase() + secondname.value.slice(1),
        "initials": (firstname.value.charAt(0) + secondname.value.charAt(0)).toUpperCase(),
        "full_name": firstname.value + ' ' + secondname.value,
        "color": getColorForName(initials),
        "email": email.value,
        "phone": phone.value,
        "addetAt": new Date().getTime(),
    };
    return contactInfo;
}

/**
 * load contacts from server
 */
function loadContacts() {
    contacts = JSON.parse(backend.getItem('modyfiedContacts')) || [];
}

/**
 * save contacts to server
 */
async function saveContacts() {
    await backend.setItem('modyfiedContacts', JSON.stringify(contacts));
}

/**
 * clearing the inputfields on addTask page
 * @param {string} firstname - first name from input field
 * @param {string} secondname - second name from input field
 * @param {string} email - email from input field
 * @param {string} phone - phone number from input field
 */
function clearInputFieldsAddTask(firstname, secondname, email, phone) {
    firstname.value = '';
    secondname.value = '';
    email.value = '';
    phone.value = '';
}

/**
 * delete contact by click on trash on contact page
 * @param {number} i - number of position in contacts Array
 */
function removeContact(i) {
    contacts.splice(i, 1);
    saveContacts();
    renderContacts();
}

/**
 * show full info of contact with phone, mail...
 * @param {number} i - number of position in contacts Array
 */
function showFullContactInfo(i) {
    let fullContactInfo = document.getElementById('full_contact_Info_Container');
    fullContactInfo.innerHTML = '';
    fullContactInfo.innerHTML += contactInfo(i);
    activateContact(i);
}

/**
 * generate color for contact profile picture
 * @param {string} initials - initials from contact
 * @returns - generated color
 */
function getColorForName(initials) {
    let number = (initials.charCodeAt(0) + initials.charCodeAt(1)) % contactColors.length;
    return contactColors[number];
}

/**
 * check the window with and height to use the right exit button 
 * @param {boolean} mediaForContact - check if media > 992px
 */
function checkMediaforExitButton(mediaForContact) {
    let btn = document.getElementById('close_contact_btn');

    if (mediaForContact.matches) {
        btn.src = 'img/clear_white.png';
    } else {
        btn.src = 'img/clear.png';
    }
}

/**
 * save the contact which was edited
 */
function saveEditedContact() {
    let firstName = document.getElementById('edited_firstname');
    let secondName = document.getElementById('edited_secondname');
    let newFirstName = document.getElementById('edited_firstname').value;
    let newSecondName = document.getElementById('edited_secondname').value;
    let newEmail = document.getElementById('edited_email').value;
    let newphoneNumber = document.getElementById('edited_phone').value;
    let contact = contacts[contactID];
    checkEditedContactAndSave(firstName, secondName, newFirstName, newSecondName, newEmail, newphoneNumber, contact);
}

/**
 * 
 * @param {string} firstName - container of edited first name
 * @param {string} secondName - container of edited second name
 * @param {string} newFirstName - value of edited first name
 * @param {string} newSecondName - value of edited second name
 * @param {string} newEmail - value of edited email
 * @param {number} newphoneNumber - value of edited phone number
 * @param {number} contact - position of contact in Array contacts
 */
async function checkEditedContactAndSave(firstName, secondName, newFirstName, newSecondName, newEmail, newphoneNumber, contact) {
    if(!checkContactInputs(firstName, secondName)) {
        
        contact['first_name'] = newFirstName.charAt(0).toUpperCase() + newFirstName.slice(1);
        contact['second_name'] = newSecondName.charAt(0).toUpperCase() + newSecondName.slice(1);
        contact['initials'] = (newFirstName.charAt(0) + newSecondName.charAt(0)).toUpperCase();
        contact['email'] = newEmail;
        contact['phone'] = newphoneNumber;

        await saveContacts();
        successAnimationForEditContact();
        getInfoFromNewContactField();
        showFullContactInfo(contactID);
        if (mediaforBoard.matches) {showFullContactInfoMobile(contactID)};
    }
}

/**
 * - reder all contacts in contact page
 */
function renderContacts() {
    sortContacts();
    let contactField = document.getElementById('listning');
    contactField.innerHTML = '';
    document.getElementById('listning').innerHTML = '';
    visualisizeContacts(contactField);
    firstLetter = [];
}

/**
 *  - visualisize all contacts from contact list
 * @param {*} contactField - container for rendering contacts (contact list)
 */
function visualisizeContacts(contactField) {
    for (let i = 0; i < contacts.length; i++) {
        let initials = contacts[i]['initials'];
        let user = contacts[i]['second_name'];
        let firstsecondnameLetter = user.match(/\b(\w)/g).join('');
        if (!firstLetter.includes(firstsecondnameLetter)) {
            firstLetter.push(firstsecondnameLetter);
            contactField.innerHTML += 
                letterNotExist(i, initials, firstsecondnameLetter);
        } else {
            document.getElementById(`${firstsecondnameLetter}`).innerHTML += 
                letterAlreadyExist(i, initials);
        }
    }
}

/**
 * sort all contacts by alphabet
 */
function sortContacts() {
    contacts.sort((a, b) => a.second_name.localeCompare(b.second_name));
}

/**
 * animation to disyplay succesfull create contact
 */
function successAnimationForNewContact() {
    let succesAnimationContact = document.getElementById('success_animation_contact');
    succesAnimationContact.classList.remove('d-none');
    setTimeout(() => {closeNewContactWindow(succesAnimationContact)}, "1300"); 
}

/**
 * animation to disyplay succesfull edit contact
 */
function successAnimationForEditContact() {
    let succesAnimationContact = document.getElementById('success_animation_contact');
    succesAnimationContact.classList.remove('d-none');
    setTimeout(() => {closeEditContactPopup(succesAnimationContact)}, "1300");
}

/**
 * - highlight the selected contact
 * @param {number} id - position of contact in Array, contacts
 */
function activateContact(id) {
    for (let i = 0; i < contacts.length; i++) {
        let element = document.getElementById(`full_listner_${i}`);
        if (element.classList.contains('active_contact')) {
            element.classList.remove('active_contact');
            document.getElementById(`name${i}`).style.color = 'black';
        }
    }
    document.getElementById(`full_listner_${id}`).classList.add('active_contact');
    document.getElementById(`name${id}`).style.color = 'white';
}

/**
 * check if all impotant input fields filled from user to create or edit contact
 * @param {string} firstname - first name from input field
 * @param {string} secondname - second name from input field
 * @returns - boolean; true if one important input is empty / false if all importnant inputs are filled
 */
function checkContactInputs(firstname, secondname) {
    let emptyInput = false;

    if (firstname.value == '') {
        firstname.parentElement.classList.add('empty')
    } else {
        firstname.parentElement.classList.remove('empty');
    }
    if (secondname.value == '') {
        secondname.parentElement.classList.add('empty');
    } else {
        secondname.parentElement.classList.remove('empty');
    }
    if (firstname.value == '' || secondname.value == '') {
        emptyInput = true;
    }
    return emptyInput;
}

/**
 * check the phone number for validation
 * @returns - boolean
 */
function checkPhoneNumber() {
    let phoneNumber = false;
    let input;

    if (document.getElementById("phone")) {
        input = document.getElementById("phone");
    } else {
        input = document.getElementById("edited_phone");
    }
    if (input.value.length < 10 || input.value.length > 14) {
        input.value = '';
        input.placeholder = 'please use a valid phone number';
        phoneNumber = false
    } else {
        input.placeholder = 'Phone';
        phoneNumber = true
    }
    return phoneNumber;
}

/**
 * check the email for validation
 * @returns - boolean
 */
function checkEmail() {
    let email = false;
    let input;

    if (document.getElementById("email")) {
        input = document.getElementById("email");
    } else {
        input = document.getElementById("edited_email");
    }

    if (input.value == "" || input.value.indexOf("@", 0) < 0 || input.value.indexOf(".", 0) < 0) {
        input.value = '';
        input.placeholder = 'please use a valid email';
        email = false
    } else {
        input.placeholder = 'Email';
        email = true;
    }
    return email;
  }