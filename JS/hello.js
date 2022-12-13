/**
 * initialisize greeting animation for current user 
 */
async function initGreeting() {
    await downloadFromServer();
    activeUser = JSON.parse(backend.getItem('currentUser')) || []; // load all users
    checkDayTime();
    replaceDayTime();
    replaceName(activeUser);
    await saveContacts();
    await saveTasks();
    await saveCategories();

    setTimeout(() => {
        location.href = 'summary.html';
    }, "2000")

}

/**
 * get the actually time of the day
 */
function checkDayTime() {
    let today = new Date()
    let curHr = today.getHours()

    if (curHr < 12) {
        greetingTime = 'Good morning';
    } else if (curHr < 18) {
        greetingTime = 'Good afternoon';
    } else {
        greetingTime = 'Good evening';
    }
}

/**
 * fill the actually greeting day time
 */
function replaceDayTime() {
    document.getElementById('day_time').innerHTML = greetingTime;
}

/**
 * fill the actually user in the greetin
 * @param {string} activeUser - logged user
 */
function replaceName(activeUser) {
    document.getElementById('greetingName').innerHTML = activeUser;
}

/**
 * fill the actually greeting day time on board page
 */
function replaceDayTimeInSummary() {
    document.getElementById('dayTime').innerHTML = greetingTime;
}

/**
 * fill the actually user in the greeting on board page
 * @param {string} activeUser - logged user
 */
function replaceNameInSummary(activeUser) {
    document.getElementById('greeting_Name').innerHTML = activeUser;
}