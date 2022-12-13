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
        }, 300);
    }
}

function loadAddTaskPopupWindow() {
    document.querySelector('.addtask_popup').innerHTML = addTaskPopupWindowContent();
}