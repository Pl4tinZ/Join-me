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

function activeMenu() {
    let pages = ['summary.html', 'board.html', 'addtask.html', 'contacts.html', 'legalnotice.html'];

    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const url = `https://dennis-frese.developerakademie.net/Join/${page}`;
        let className = page.substring(0,page.length-5);
        let container = document.querySelector(`.${className}`)

        if (location.href == url) {
            container.classList.add('active_menu');
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