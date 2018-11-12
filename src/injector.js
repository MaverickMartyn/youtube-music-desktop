const {ipcRenderer, ipcMain} = require('electron');

// Sets up icons.
ipcRenderer.on("mm:set-icon", function (event, data) {
    document.getElementById("musix-match-lyrics-btn").src = data;
})
ipcRenderer.on("app:set-settings-icon", function (event, data) {
    document.getElementById("settings-btn").src = data;
})

// Handles the media buttons.
ipcRenderer.on("media:playpause", function () {
    document.getElementById("play-pause-button").click();
})
ipcRenderer.on("media:next", function () {
    document.querySelector("#left-controls > div > paper-icon-button.next-button.style-scope.ytmusic-player-bar").click();
})
ipcRenderer.on("media:previous", function () {
    document.querySelector("#left-controls > div > paper-icon-button.previous-button.style-scope.ytmusic-player-bar").click();
})

ipcRenderer.on("initialize",function(event,data){
    // window.yt.ui.Dialog for potential "native" looking dialogs?
    // window.yt.util.activity.getTimeSinceActive() to get time since user was active.

    document.getElementById("right-content").insertAdjacentHTML('afterbegin', '<img id="musix-match-lyrics-btn" class="btn"></img>');
    document.getElementById("right-content").insertAdjacentHTML('afterbegin', '<img id="settings-btn" class="btn"></img>');
    document.getElementsByTagName("body")[0].insertAdjacentHTML('afterbegin', '<div id="musix-match-lyrics" class="mm-lyrics"></div>');

    document.getElementById("musix-match-lyrics-btn").addEventListener('click', function() {
        document.getElementById("musix-match-lyrics").classList.toggle("show") // Opens the MusixMatch Lyrics overlay.
    });
    document.getElementById("settings-btn").addEventListener('click', function() {
        ipcRenderer.send("app:open-settings"); // Opens the settings window.
    });
    ipcRenderer.on("mm:lyrics-changed", function (event, args) {
        console.log("New lyrics recieved.");
        window.lyrics = JSON.parse(JSON.stringify(args));
        renderLyrics(window.lyrics);
    })

    document.addEventListener('webkitfullscreenchange', function(e) {
        console.log('Fullscreen set to ' + document.webkitIsFullScreen + '.');
        ipcRenderer.send("win:toggled-fullscreen", document.webkitIsFullScreen);
    }, false);
    
    document.addEventListener('mozfullscreenchange', function(e) {
        console.log('Fullscreen set to ' + document.mozIsFullScreen + '.');
        ipcRenderer.send("win:toggled-fullscreen", document.mozIsFullScreen);
    }, false);
    
    document.addEventListener('fullscreenchange', function(e) {
        console.log('Fullscreen set to ' + document.fullscreenEnabled + '.');
        ipcRenderer.send("win:toggled-fullscreen", document.fullscreenEnabled);
    }, false);
    
    // Gets the current video code by lsitening for changes in the image tag containing the current tracks thumbnail.
    var codeImgTag = document.querySelector("#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > img")
    var x = new MutationObserver(function(e) {
        window.trackStartTime = Date.now();
        SendVideoCodeToMain(codeImgTag);
    });
    
    x.observe(codeImgTag, {
        attributes: true
    });
    SendVideoCodeToMain(codeImgTag);

    // Listens for progress through the track.
    // TODO: Find a better way to do this, as only having seconds, is not very accurate.
    document.getElementById('progress-bar').addEventListener("value-changed", function (data) {
        syncLyrics(data.detail.value);
    });
});

/**
 * Highlights the current line in the lyrics.
 **/
function syncLyrics(time) {
    for (let i = 0; i < window.lyrics.transcript.text.length; i++) {
        const lyric = window.lyrics.transcript.text[i];
        if (lyric.$.start >= (time-0.25)) {
            console.log("Active lyric: "+lyric._);
            var el = document.querySelector("#musix-match-lyrics > p[data-index=\""+i+"\"]")
            var elContainer = document.getElementById("musix-match-lyrics");
            el.classList.add("active-lyric");
            el.scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'center'
            });
            return;
        }
        else {
            document.querySelector("#musix-match-lyrics > p[data-index=\""+i+"\"]").classList.remove("active-lyric");
        }
    }
}

/**
 *  Renders the current lyrics on the page.
 **/
function renderLyrics(lyrics) {
    document.getElementById("musix-match-lyrics").innerHTML = "";
    var lyricsHtml = "";
    if (lyrics !== null) {
        for (let i = 0; i < lyrics.transcript.text.length; i++) {
            const line = lyrics.transcript.text[i];
            lyricsHtml += '<p data-index="'+i+'">'+line._+'</p>';
        }
    }
    else {
        console.log("Lyrics were null.")
        lyricsHtml = "<p>Sorry, we couldn't find any lyrics for you.</p>";
    }
    
    document.getElementById("musix-match-lyrics").insertAdjacentHTML('afterbegin', lyricsHtml);
}

/**
 * Sends the YouTube video code to the main process.
 **/
function SendVideoCodeToMain(tag) {
    var thumbnailSrc = tag.getAttribute("src");
    var videoCode = thumbnailSrc.replace("https://i.ytimg.com/vi/", "").split("/")[0];
    console.log("New video code: " + videoCode);
    ipcRenderer.send("ytm:track-changed", videoCode);
}