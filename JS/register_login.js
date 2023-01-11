setURL('https://dennis-frese.developerakademie.net/smallest_backend_ever'); 

/**
 * initialisize content for Index
 */
async function init() {
    enableLoadingAnimation()
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || []; // load all users
    checkIfAutocomplete();
    disableLoadingAnimation();
    enableLoginButtons();
}

/**
 * - register user
 */
async function addUser() {
    let name = document.getElementById('register_name');
    let email = document.getElementById('register_email');
    let password = document.getElementById('register_password');
    users.push({name: name.value, email: email.value.toLowerCase(), password: password.value});
    await backend.setItem('users', JSON.stringify(users)); // save users
    document.getElementById('success_animation').classList.remove('d-none');

    setTimeout(() => {
        location.href = 'index.html';
      }, "1000")  
}

/**
 * - login
 */
function login() {
    let email = document.getElementById('login_email');
    let password = document.getElementById('login_password');
    let user = users.find( u => u.email.toLowerCase() == email.value.toLowerCase() && u.password == password.value)

    if (user) {
        rightPassword(user);
    } else {
        wrongPassword();
    }
}

/**
 * login section right password
 */
async function rightPassword(user) {
    document.getElementById('wrong_login').classList.add('d-none');
    currentUser.push(user['name']);
    await backend.setItem('currentUser', JSON.stringify(currentUser)); // save users
    sessionStorage.setItem(loggedUser, 'logged');
    counter = 0;
    rememberMe();
    location.href = 'hello.html';
}

/**
 * login section wrong password
 */
function wrongPassword() {
    counter++;
    document.getElementById('wrong_login').classList.remove('d-none');
    if (counter >= 2) {
        animateForgotPassword();
    }
}

/**
 * - guest login works without sign up
 */
async function guestLogin() {
    activeUser = 'guest';
    currentUser.push(activeUser);
    sessionStorage.setItem(loggedUser, 'logged');
    await backend.setItem('currentUser', JSON.stringify(currentUser));
    location.href = 'hello.html';
}

/**
 * - animation that highlight the forgot password button
 */
function animateForgotPassword() {
    document.getElementById('forgot_password_link').animate(
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
 * - function for autofill login at the next time
 */
function rememberMe() {
    let checkBox = document.getElementById('remember_me');
    let email = document.getElementById('login_email');
    let password = document.getElementById('login_password');

    if (checkBox.checked){
        localStorage.email = email.value.toLowerCase();
        localStorage.password = password.value;
        localStorage.checkbox = checkBox.value;
      } else {
        localStorage.email = "";
        localStorage.password = "";
        localStorage.checkbox = "";
      }
}

/**
 * - check if remember me button was clicked last time
 */
function checkIfAutocomplete() {
    let email = document.getElementById('login_email');
    let password = document.getElementById('login_password');
    let checkBox = document.getElementById('remember_me');

    if (localStorage.getItem('email') !== null) {
        email.value = localStorage.email.toLowerCase();
        password.value = localStorage.password;

        if(!checkBox.checked) {
            checkBox.click();
        }
    }
}

/**
 * loading animation while downloading all informations from server
 */
function enableLoadingAnimation() {
    document.getElementById('loading_animation').classList.remove('d-none');
}

/**
 * disable loading animation if download from server was succesfull
 */
function disableLoadingAnimation() {
    document.getElementById('loading_animation').classList.add('d-none');
}

/**
 * - enable login buttons if download from server was succesfull
 */
function enableLoginButtons() {
    let loginBtn = document.getElementById('logInButton');
    let guestLoginBtn = document.getElementById('guestLogInButton');

    loginBtn.disabled = false;
    guestLoginBtn.disabled = false;
    loginBtn.classList.remove('disabled');
    guestLoginBtn.classList.remove('disabled');
}

