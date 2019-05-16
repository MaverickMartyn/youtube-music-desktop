const { ipcRenderer } = require('electron')
// const {observe} = require('selector-observer')

document.addEventListener('DOMContentLoaded', function () {
  var layoutElementReadyLoop = setInterval(function () {
    // Setup fullscreen-controls mutation observer
    var layoutElement = document.getElementById('layout')
    if (layoutElement) {
      var DFVCObserver = new MutationObserver(function (e) {
        ipcRenderer.sendToHost('ytm:displayFullscreenVideoControlsChanged', layoutElement.hasAttribute('show-fullscreen-controls_'))
      })

      DFVCObserver.observe(layoutElement, {
        attributes: true,
        attributeFilter: ['show-fullscreen-controls_']
      })

      var isPlayerFullscreenObserver = new MutationObserver(function (e) {
        ipcRenderer.sendToHost('win:togglefullscreen', layoutElement.hasAttribute('player-fullscreened_'))
      })

      isPlayerFullscreenObserver.observe(layoutElement, {
        attributes: true,
        attributeFilter: ['player-fullscreened_']
      })
      
      clearInterval(layoutElementReadyLoop)
    }
  }, 300)
  var videoTagReadyLoop = setInterval(function () {
    var videoTag = document.querySelector('#movie_player > div.html5-video-container > video')

    if (videoTag !== null) {
      // Setup login mutation observer
      var loginMenuElement = document.querySelector('.center-content.style-scope.ytmusic-nav-bar')

      if (loginMenuElement) {
        console.log('Setting up mutation observer...')
        var x = new MutationObserver(function (e) {
          console.log('isLoggedIn changed to ' + !document.querySelector('a.sign-in-link.style-scope.ytmusic-nav-bar'))
          ipcRenderer.sendToHost('ytm:isLoggedInChanged', !document.querySelector('a.sign-in-link.style-scope.ytmusic-nav-bar'))
        })

        x.observe(loginMenuElement, {
          attributes: true,
          childList: true,
          subtree: true
        })
      }

      var byLineElement = document.querySelector('.subtitle.style-scope.ytmusic-player-bar')

      if (byLineElement) {
        console.log('Setting up mutation observer...')
        updateCurrentTrack(byLineElement, videoTag)
        var y = new MutationObserver(function (e) {
          updateCurrentTrack(byLineElement, videoTag)
        })

        y.observe(byLineElement, {
          subtree: true,
          characterData: true,
          childList: true,
          attributes: true
        })
      } else {
        console.log('byline not ready yet.')
      }

      videoTag.addEventListener('play', function () {
        console.log('Video playing')
        ipcRenderer.sendToHost('ytm:play', null)
      })
      videoTag.addEventListener('pause', function () {
        console.log('Video paused')
        ipcRenderer.sendToHost('ytm:pause', null)
      })
      videoTag.addEventListener('seeking', function () {
        console.log('Video seeking')
        ipcRenderer.sendToHost('ytm:seeking', null)
      })
      videoTag.addEventListener('seeked', function () {
        console.log('Video seeked')
        ipcRenderer.sendToHost('ytm:seeked', null)
      })
      videoTag.addEventListener('change', function () {
        // change track?
      })

      videoTag.addEventListener('volumechange', function () {
        console.log('volumechanged')
      })

      videoTag.addEventListener('timeupdate', function () {
        // this.$store
        ipcRenderer.sendToHost('ytm:timeupdated', videoTag.currentTime)
        ipcRenderer.sendToHost('ytm:updateVideoBounds', videoTag.getBoundingClientRect())
        console.log('timeupdated')
      })

      ipcRenderer.on('play', function () {
        videoTag.play()
      })

      ipcRenderer.on('pause', function () {
        videoTag.pause()
      })
      clearInterval(videoTagReadyLoop)
    }
  }, 300)

  // observe('#movie_player > div.html5-video-container > video', {
  //   add (el) {
  //   }
  // })
})

function updateCurrentTrack (byLineElement, videoTag) {
  console.log('Track change detected.')
  var titleElement = document.querySelector('.title.style-scope.ytmusic-player-bar')
  var artistElement = document.querySelector('.byline.style-scope.ytmusic-player-bar.complex-string')
  if (artistElement === null) {
    return
  }
  var artElement = document.querySelector('.image.style-scope.ytmusic-player-bar')
  var videoId = null
  if (artElement.src.indexOf('i.ytimg.com/vi') !== -1) {
    videoId = artElement.src.split('vi/')[1].split('/')[0]
  }
  ipcRenderer.sendToHost('ytm:trackChanged', {
    title: titleElement.textContent.replace(/\s+/g, ' ').trim(),
    artist: artistElement.textContent.replace(/\s+/g, ' ').trim(),
    byLine: byLineElement.textContent.replace(/\s+/g, ' ').trim(),
    videoId,
    art: artElement.src,
    duration: videoTag.duration
  })
}

// document.addEventListener('DOMContentLoaded', function () {
//   // Setup login mutation observer
//   var loginMenuElement = document.querySelector('.center-content.style-scope.ytmusic-nav-bar')

//   if (loginMenuElement) {
//     console.log('Setting up mutation observer...')
//     var x = new MutationObserver(function (e) {
//       console.log('isLoggedIn changed to ' + !document.querySelector('a.sign-in-link.style-scope.ytmusic-nav-bar'))
//       ipcRenderer.sendToHost('isLoggedInChanged', !document.querySelector('a.sign-in-link.style-scope.ytmusic-nav-bar'))
//     })

//     x.observe(loginMenuElement, {
//       attributes: true,
//       childList: true,
//       subtree: true
//     })
//   }

//   // Setup play/pause mutation observer
//   var playPauseElement = document.querySelector('.play-pause-button.ytmusic-player-bar')

//   if (playPauseElement) {
//     console.log('Setting up mutation observer...')
//     var y = new MutationObserver(function (e) {
//       var isPlaying = playPauseElement.attributes['title'] && playPauseElement.attributes['title'].value !== 'Play'
//       console.log('isPlaying changed to ' + isPlaying)
//       ipcRenderer.sendToHost('isPlayingChanged', isPlaying)
//     })

//     y.observe(playPauseElement, {
//       attributes: true,
//       attributeFilter: [ 'title' ]
//     })
//   }

//   // Setup track info mutation observer
//   var trackInfoElement = document.querySelector('.title.style-scope.ytmusic-player-bar')
//   var subtitleTrackInfo = document.querySelector('.subtitle.style-scope.ytmusic-player-bar')

//   if (subtitleTrackInfo) {
//     console.log('Setting up mutation observer...')
//     var z = new MutationObserver(function (e) {
//       if (subtitleTrackInfo && subtitleTrackInfo.children.length > 0) {
//         var subtitle = subtitleTrackInfo.children[0]
//         var info = {
//           title: trackInfoElement.textContent,
//           artist: subtitle.textContent
//         }
//         console.log('trackInfoElement was updated to ' + info.title + ' by ' + info.artist)
//         ipcRenderer.sendToHost('trackInfoUpdated', info)
//       }
//     })

//     z.observe(subtitleTrackInfo, {
//       characterData: true,
//       subtree: true
//     })
//   }

//   // Setup next button event
//   var nextButtonElement = document.querySelector('.next-button.ytmusic-player-bar')

//   if (nextButtonElement) {
//     console.log('Setting up click event...')
//     nextButtonElement.addEventListener('click', function () {
//       console.log('Skipped to next track')
//       ipcRenderer.sendToHost('nextBtnPressed')
//     })
//   }

//   // Setup prev button event
//   var prevButtonElement = document.querySelector('.previous-button.ytmusic-player-bar')

//   if (prevButtonElement) {
//     console.log('Setting up click event...')
//     prevButtonElement.addEventListener('click', function () {
//       console.log('Skipped to previous track')
//       ipcRenderer.sendToHost('prevBtnPressed')
//     })
//   }
// })
