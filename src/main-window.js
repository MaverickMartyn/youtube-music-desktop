// This is the code-behind for index.html

const {ipcRenderer} = require('electron');
var path = require('path');
const webview = document.getElementById("myweb");
require('./src/title-bar.js');
// When everything is ready, trigger the events without problems
webview.addEventListener("dom-ready", function() {
    // Injects the required CSS and base64 images.
    var p = path.join(__dirname, 'src', 'css', 'mm-lyrics.css'); // CSS for the Musixmatch lyrics overlay.
    var fs = require('fs');
    fs.readFile(p, 'utf8', function (err, data) {
        if (err) return console.log(err);
        webview.insertCSS(data)
    });
    var p = path.join(__dirname, 'src', 'css', 'misc-injected.css'); // Misclaneous CSS for injected buttons and such.
    var fs = require('fs');
    fs.readFile(p, 'utf8', function (err, data) {
        if (err) return console.log(err);
        webview.insertCSS(data)
    });
    var p = path.join(__dirname, 'images', 'musix-match-logo.base64'); // MusixMatch logo in bas64 for use as button.
    fs.readFile(p, 'utf8', function (err, data) {
        if (err) return console.log(err);
        webview.send("mm:set-icon", data);
    });
    var p = path.join(__dirname, 'images', 'settings.base64'); // The settings icon in base64.
    fs.readFile(p, 'utf8', function (err, data) {
        if (err) return console.log(err);
        webview.send("app:set-settings-icon", data);
    });

    console.log("DOM-Ready, triggering events !");
    
    ipcRenderer.on("app:open-settings", function () {
        ipcRenderer.send("app:open-settings"); // Passes the request on to the main process.
    })

    // Passes media button presses on, from the main process to the webviews renderer process.
    webview.send("initialize");
    ipcRenderer.on("media:playpause", function () {
        webview.send("media:playpause");
    })
    ipcRenderer.on("media:next", function () {
        webview.send("media:next");
    })
    ipcRenderer.on("media:previous", function () {
        webview.send("media:previous");
    })
});

// Process the data from the webview
webview.addEventListener('ipc-message',function(event){
    console.log(event);
    console.info(event.channel);
});