// This script is responsible for creating, and handling interactions with, the window title bar.

document.getElementById("quit-btn").addEventListener("click", function () {
    // Send quit
    ipcRenderer.send('win:quit')
});
document.getElementById("maximize-btn").addEventListener("click", function (e) {
    ipcRenderer.send('win:toggle-maximize')
});
ipcRenderer.on('win:toggled-maximize', function(event, isMaximized){
    if (isMaximized) {
        document.getElementById("maximize-btn").classList.add("mdi-window-restore")
        document.getElementById("maximize-btn").classList.remove("mdi-window-maximize")
    }
    else {
        document.getElementById("maximize-btn").classList.remove("mdi-window-restore")
        document.getElementById("maximize-btn").classList.add("mdi-window-maximize")
    }
});

function toggled_fullscreen(event, isFullscreen){
    if (isFullscreen) {
        document.getElementById("title-bar").classList.add("collapsed")
        document.getElementById("myweb").classList.add("fullscreened")
    }
    else {
        document.getElementById("title-bar").classList.remove("collapsed")
        document.getElementById("myweb").classList.remove("fullscreened")
    }
    console.log('Fullscreen state changed to '+isFullscreen+'.');
}

ipcRenderer.on('win:toggled-fullscreen', toggled_fullscreen);

document.getElementById("minimize-btn").addEventListener("click", function () {
    ipcRenderer.send('win:minimize')
});
var fullscreenBtn = document.getElementById("toggle-fullscreen-btn");
if (fullscreenBtn !== null) {
    fullscreenBtn.addEventListener("click", function (e) {
        ipcRenderer.send('win:togglefullscreen')
    });
}

// If already in fullscreen, update the title bar to reflect that fact.
if (window.innerHeight == screen.height) {
    toggled_fullscreen(null, true)
}

// webview.addEventListener('enter-html-full-screen', function () {
//     ipcRenderer.send('win:toggled-fullscreen', true)
// });
// webview.addEventListener('leave-html-full-screen', function () {
//     ipcRenderer.send('win:toggled-fullscreen', false)
// });