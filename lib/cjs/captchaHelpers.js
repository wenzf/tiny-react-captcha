"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDarkModePerefered = exports.getCharCollection = exports.randomString = exports.randomNumber = void 0;
const constants_1 = require("./constants");
function randomNumber(minInp, maxInp) {
    let min = minInp;
    let max = maxInp;
    if (minInp > maxInp) {
        min = maxInp;
        max = minInp;
        // throw new Error('Invalid range: min must be less than or equal to max');
    }
    if (typeof window === 'object' && window?.crypto && typeof window.crypto.getRandomValues === 'function') {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        const randomNumber = array[0] / (Math.pow(2, 32) - 1); // Normalize to [0, 1)
        // Scale to desired range
        return Math.floor(randomNumber * (max - min + 1)) + min;
    }
    else {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
exports.randomNumber = randomNumber;
function randomString(length, charCollection) {
    let result = '';
    const characters = charCollection;
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
        result += characters.charAt(randomNumber(0, charactersLength));
    }
    return result;
}
exports.randomString = randomString;
function getCharCollection(collectionStringType, captchaCharsCollection) {
    if (!collectionStringType)
        return constants_1.abc123Friendly;
    if (!captchaCharsCollection?.length && collectionStringType === "custom") {
        throw new Error('If captchaStringType is set to custom, a captchaCharsCollection with a collection of chars must be provided.');
    }
    if (captchaCharsCollection?.length)
        return captchaCharsCollection;
    switch (collectionStringType) {
        case "abc123Friendly": return constants_1.abc123Friendly;
        case "abc123Complete": return constants_1.abc123Complete;
        case "abcComplete": return constants_1.abc123Complete;
        case "abcLowerCase": return constants_1.abcLowerCase;
        case "abcUpperCase": return constants_1.abcUpperCase;
        case "numbers": return constants_1.numbers;
        default: return constants_1.abc123Friendly;
    }
}
exports.getCharCollection = getCharCollection;
const isDarkModePerefered = () => {
    if (typeof window === 'object') {
        const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkMode)
            return true;
    }
    return false;
};
exports.isDarkModePerefered = isDarkModePerefered;
