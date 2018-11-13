// This is the code-behind for settings.html

const {ipcRenderer} = require('electron');
require('./src/title-bar.js');
const Store = require('electron-store');
const store = new Store();

var content = document.querySelector('div.content');
var last_update_info = store.get('last-update-info');
if (last_update_info !== undefined) {
    content.insertAdjacentHTML('beforeend', '<div id="changelog"><p>'+last_update_info.version+' changelog</p><p>'+last_update_info.releaseNotes+'</p></div>');
}
else {
    content.insertAdjacentHTML('beforeend', '<div id="changelog"><h3>Latest changelog</h3><p>No changelog available for this release.</p></div>');
}