/**
 * - render summary page
 */
async function initSummary() {
    checkIfLogged();
    await downloadFromServer();
    loadTasks();
    showNumberOfTasks();
    showNumberOfTasksAwaitingFeedback();
    showNextCardAwaiting();
    initGreetingSummary();
}

/**
 * - displays the number of all tasks
 */
function showNumberOfTasks() {
    let boardNumber = document.getElementById('tasksInBoard');
    boardNumber.innerHTML = '';
    boardNumber.innerHTML = tasks.length;
}

/**
 * - greeting the user with the actually day time
 */
async function initGreetingSummary() {
    await downloadFromServer();
    let activeUser = JSON.parse(backend.getItem('currentUser')) || []; // load all users
    checkDayTime();
    replaceDayTimeSummary();
    replaceNameSummary(activeUser);
}

/**
 * - render the actually day time
 */
function replaceDayTimeSummary() {
    document.getElementById('dayTime').innerHTML = greetingTime;
}

/**
 * - render the actually user
 * @param {string} activeUser - logged user
 */
function replaceNameSummary(activeUser) {
    document.getElementById('greeting_Name').innerHTML = activeUser[0].charAt(0).toUpperCase() + activeUser[0].slice(1);
}

/**
 * - render the number of the tasks splitted in categories
 */
function showNumberOfTasksAwaitingFeedback() {
    let progressNumber = 0;
    let awaitingFeedback = 0;
    let toDo = 0;
    let tasksDone = 0;
    let urgent = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['progress'] == 'awaitingFeedback') {
            awaitingFeedback++;
        }
        if (tasks[i]['progress'] == 'inProgress') {
            progressNumber++;
        }
        if (tasks[i]['progress'] == 'toDo') {
            toDo++;
        }
        if (tasks[i]['progress'] == 'done') {
            tasksDone++;
        }
        if (tasks[i]['prio'] == 'urgent') {
            urgent++;
        }
    }
    document.getElementById('awaitingFeedback').innerHTML = awaitingFeedback;
    document.getElementById('tasksInProgress').innerHTML = progressNumber;
    document.getElementById('toDo').innerHTML = toDo;
    document.getElementById('done').innerHTML = tasksDone;
    document.getElementById('urgent').innerHTML = urgent;
}

/**
 * - displays the next deadline of tasks
 */
function showNextCardAwaiting() {
    let nextcard = document.getElementById('deadlineDate');
    nextcard.innerHTML = `${findMinDate()}`;
}

/**
 * - calculate the next deadline of tasks
 * @returns - date of the next deadline of tasks
 */
function findMinDate() {
    let dates = tasks.map(({ dueDate }) => new Date(dueDate));
    let minDate = new Date(Math.min(...dates));
    // let maxDate = new Date(Math.max(...dates)); not in use

    let month = monthNames[minDate.getMonth()];
    let year = minDate.toISOString().split('T')[0].slice(0, 4);
    let day = minDate.toISOString().split('T')[0].slice(-2);

    return month + ' ' + day + ',' + ' ' + year;
}