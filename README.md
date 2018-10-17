# YouTube Music for Desktop
An unofficial desktop client for YouTube Music, with integrated lyrics from MusixMatch. 
You can check out my other work here: [https://www.codeslasher.com/](https://www.codeslasher.com/)

### Download
Download the latest release on [https://github.com/MaverickMartyn/youtube-music-desktop/releases](https://github.com/MaverickMartyn/youtube-music-desktop/releases)

![Animated gif of YouTube Music for Desktop](./images/youtube-music.gif)

### Todo:
See [TODO.md](TODO.md)

### Build requirements:
* Yarn package manager (1.10.0+)
* Node (v8.12.0+)
* Electron (v3.0.2+)

### Build guide
* Run `yarn run dist`
* Resulting artifacts are in the ./dist folder.

### Publishing release artefacts
To publish a new release artifact, you need to set `GH_TOKEN` to the GitHub Token for your fork repo.
Use `[Environment]::SetEnvironmentVariable("GH_TOKEN","<YOUR_TOKEN_HERE>","User")` to do that.
Then you need to run `yarn run publish`.
Finally you just need to publish the release on GitHub, through the releases page.

### Disclaimer
1. I do **NOT** own YouTube Music or MusixMatch, nor am I affiliated or even endorsed by them.
2. This software is provided as is, with no warranties and/or support guaranteed.
