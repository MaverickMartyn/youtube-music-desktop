const {ipcRenderer} = require('electron');

// Do something according to a request of your mainview

ipcRenderer.on('request', function(){
    ipcRenderer.sendToHost(getScripts());
});
ipcRenderer.on("mm:set-icon", function (event, data) {
    document.getElementById("musix-match-lyrics-btn").src = data;
})
ipcRenderer.on("app:set-settings-icon", function (event, data) {
    document.getElementById("settings-btn").src = data;
})
ipcRenderer.on("media:playpause", function () {
    document.getElementById("play-pause-button").click();
})
// ipcRenderer.on("media:stop", function () {
//     document.getElementById("play-pause-button").click();
// })
ipcRenderer.on("media:next", function () {
    document.querySelector("#left-controls > div > paper-icon-button.next-button.style-scope.ytmusic-player-bar").click();
})
ipcRenderer.on("media:previous", function () {
    document.querySelector("#left-controls > div > paper-icon-button.previous-button.style-scope.ytmusic-player-bar").click();
})
ipcRenderer.on("initialize",function(event,data){
    // Set up events for getting playback
    // Gets the current progress through the current track in seconds.
    // document.getElementById('progress-bar').addEventListener("value-changed", function (data) {console.log(data.detail.value)});
    // window.yt.ui.Dialog for potential "native" looking dialogs?
    // window.yt.util.activity.getTimeSinceActive() to get time since user was active.
    // https://apic-desktop.musixmatch.com/ws/1.1/macro.subtitles.get?format=json&q_track=Holy%20Diver&q_artist=Dio&q_artists=Dio&q_album=Holy%20Diver&user_language=en&tags=nowplaying&userblob_id=ZGVsaXZlciB1cyAtIHRoZSBwcmluY2Ugb2YgZWd5cHQvc291bmR0cmFjayB2ZXJzaW9uX29mcmEgaGF6YV80MzcuNjY2&namespace=lyrics_synched&f_subtitle_length_max_deviation=1&subtitle_format=mxm&app_id=web-desktop-app-v1.0&usertoken=1802025cede6da9d0aca4f88fe4ba252dfe17741aee41cce5de911&guid=30fd8942-5292-4b25-9497-163504a58efb&signature=f5YU8IBzcEhUDsniI48d3qC2ezU%3D&signature_protocol=sha1

    document.getElementById("right-content").insertAdjacentHTML('afterbegin', '<img id="musix-match-lyrics-btn"></img>');
    document.getElementById("right-content").insertAdjacentHTML('afterbegin', '<img id="settings-btn" class="btn"></img>');
    document.getElementsByTagName("body")[0].insertAdjacentHTML('afterbegin', '<div id="musix-match-lyrics" class="mm-lyrics"></div>');

    document.getElementById("musix-match-lyrics-btn").addEventListener('click', function() {
        document.getElementById("musix-match-lyrics").classList.toggle("show")
    });
    document.getElementById("settings-btn").addEventListener('click', function() {
        ipcRenderer.send("app:open-settings");
    });
    ipcRenderer.on("mm:lyrics-changed", function (event, args) {
        console.log("New lyrics recieved.");
        window.lyrics = JSON.parse(JSON.stringify(args));
        renderLyrics(window.lyrics);
    })
    var codeImgTag = document.querySelector("#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > img")
    var x = new MutationObserver(function(e) {
        window.trackStartTime = Date.now();
        SendVideoCodeToMain(codeImgTag);
    });
    
    x.observe(codeImgTag, {
        attributes: true
    });
    SendVideoCodeToMain(codeImgTag);

    // setInterval(function () {
    //     var currentTime = ((Date.now() - window.trackStartTime))/1000
    //     syncLyrics(currentTime);
    //     console.log("Current track time: "+currentTime);
    // }, 10)

    document.getElementById('progress-bar').addEventListener("value-changed", function (data) {
        syncLyrics(data.detail.value);
    });
});

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

function SendVideoCodeToMain(tag) {
    var thumbnailSrc = tag.getAttribute("src");
    var videoCode = thumbnailSrc.replace("https://i.ytimg.com/vi/", "").split("/")[0];
    console.log("New video code: " + videoCode);
    ipcRenderer.send("ytm:track-changed", videoCode);
}

/**
 * Simple function to return the source path of all the scripts in the document
 * of the <webview>
 *
 *@returns {String}
 **/
function getScripts(){
    var items = [];
    
    for(var i = 0;i < document.scripts.length;i++){
        items.push(document.scripts[i].src);
    }
    
    return JSON.stringify(items);
}