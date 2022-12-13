/**
 * load the menu bar
 */
function loadMenuBar() {
    document.getElementById('menubar').load("menu.html");
}

/**
 * check if user already logged
 */
function checkIfLogged() {

    let loggedUser;

    if (!sessionStorage.getItem(loggedUser, 'logged')) {
        localStorage.removeItem('token')
        navigator.sendBeacon('api/logout')
        location.href = 'index.html';
        clearTasks();
        clearContacts();
      }
}

function openProfilInformationPopUp() {
    let container = document.getElementById('profile_information');

    if (container.classList.contains('open')) {
        container.classList.add('d-none');
        container.classList.remove('open');
    } else {
        container.classList.remove('d-none');
        container.classList.add('open');
        if (mediaforBoard.matches) {
            container.innerHTML = ''
            container.innerHTML = `
            <div onclick="logout()">logout</div>
            <a href="help.html">help</a>
            <a href="legalnotice.html">legal notice</a>`
        }
    }
}

/**
 * logout current user and go to index
 */
async function logout() {
    await backend.deleteItem('currentUser'); // delete current User
    location.href = 'index.html'
}