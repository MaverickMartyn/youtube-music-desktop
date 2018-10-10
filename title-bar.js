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
ipcRenderer.on('win:toggled-fullscreen', function(event, isFullscreen){
    if (isFullscreen) {
        document.getElementById("title-bar").classList.add("collapsed")
        document.getElementById("myweb").classList.add("fullscreened")
    }
    else {
        document.getElementById("title-bar").classList.remove("collapsed")
        document.getElementById("myweb").classList.remove("fullscreened")
    }
});
document.getElementById("minimize-btn").addEventListener("click", function () {
    ipcRenderer.send('win:minimize')
});
var fullscreenBtn = document.getElementById("toggle-fullscreen-btn");
if (fullscreenBtn !== null) {
    fullscreenBtn.addEventListener("click", function (e) {
        ipcRenderer.send('win:togglefullscreen')
    });
}