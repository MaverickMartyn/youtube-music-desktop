# YouTube Music for Desktop
An unofficial desktop client for YouTube Music, with integrated lyrics from MusixMatch, and more.

You can check out my other work here: [https://www.codeslasher.com/](https://www.codeslasher.com/)

### Download
Download the latest release on [https://github.com/MaverickMartyn/youtube-music-desktop/releases](https://github.com/MaverickMartyn/youtube-music-desktop/releases)

![Animated gif of YouTube Music for Desktop](./youtube-music.gif)

### Features:
* Integrated lyrics from MusixMatch. <sup>(More coming soon)</sup>
* Media keys support.
* Material Design UI using VueJS and VuetifyJS.
* Cross-platform.
* Hotkey support. <sup>(Coming soon)</sup>
* Last.fm support. <sup>(Coming soon)</sup>

### Todo:
See [TODO.md](TODO.md)

### Build requirements:
* Yarn package manager (1.9.4+)
* Node (v8.12.0+)
* Electron (v1.7.9+)

It might work with older versions, but these are the ones I have tested.

### Build guide
* Run `yarn run dist`
* Resulting artifacts are in the ./dist folder.

### Debugging
This project has full debugging support for the renderer process using Chrome Dev Tools (inspector).
Full main process debugging is not currently available, due to webpack dev server not running, when debugging main process.

### Publishing release artefacts
To publish a new release artifact, you need to set `GH_TOKEN` to the GitHub Token for your fork repo.
Use `[Environment]::SetEnvironmentVariable("GH_TOKEN","<YOUR_TOKEN_HERE>","User")` to do that.
Then you need to run `yarn run publish`.
Finally you just need to publish the release on GitHub, through the releases page.

### Disclaimer
1. I do **NOT** own YouTube Music or MusixMatch, nor am I affiliated or even endorsed by them.
2. This software is provided as is, with no warranties and/or support guaranteed.
