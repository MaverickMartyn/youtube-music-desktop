// This file is used to fetch lyrics from MusixMatch.


/**
 *  Gets the MusixMatch lyrics based off of a YouTube Music video code.
 **/
exports.mmGetLyrics = function (youTubeId) {
    const axios = require('axios');
    var lyricsId = l(youTubeId);
    console.log("Lyrics id: " + lyricsId)
    return axios.get('https://extension.musixmatch.com/?res='+lyricsId).then(function (response) {
        return response.data;
    });
}

const l = function(b) {
    var unassigned_lit;
    var i;
    var length;
    var derived_units_txt;
    /** @type {string} */
    derived_units_txt = "";
    /** @type {number} */
    i = 0;
    for (; i < b.length;) {
        unassigned_lit = b.charCodeAt(i) + 13;
        /** @type {number} */
        length = Math.floor(Math.random() * 3 + 1);
        /** @type {string} */
        derived_units_txt = derived_units_txt + (unassigned_lit + test(length));
        i++;
    }
    return derived_units_txt;
}

const test = function(length) {
    var i;
    var possible;
    var returnValue;
    /** @type {string} */
    returnValue = "";
    /** @type {string} */
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    /** @type {number} */
    i = 0;
    for (; i < length;) {
        /** @type {string} */
        returnValue = returnValue + possible.charAt(Math.floor(Math.random() * possible.length));
        i++;
    }
    return returnValue;
}