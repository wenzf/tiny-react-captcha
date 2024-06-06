import { CaptchaStringType } from "./../types";
import { abc123Complete, abc123Friendly, abcLowerCase, abcUpperCase, numbers } from "./../constants";


export function randomNumber(minInp: number, maxInp: number): number {

    let min = minInp
    let max = maxInp

    if (minInp > maxInp) {
        min = maxInp
        max = minInp
    }
    if (typeof window === 'object' && window?.crypto && typeof window.crypto.getRandomValues === 'function') {
        const array = new Uint32Array(1)
        window.crypto.getRandomValues(array)
        const randomNumber = array[0] / (Math.pow(2, 32) - 1)

        return Math.floor(randomNumber * (max - min + 1)) + min
    } else {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}


export function randomString(length: number, charCollection: string): string {
    let result = '';
    const characters = charCollection;
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
        result += characters.charAt(randomNumber(0, charactersLength));
    }
    return result;
}


export function getCharCollection(collectionStringType?: CaptchaStringType, captchaCharsCollection?: string) {
    if (!collectionStringType) return abc123Friendly
    if (!captchaCharsCollection?.length && collectionStringType === "custom") {
        throw new Error('If captchaStringType is set to custom, a captchaCharsCollection with a collection of chars must be provided.')
    }
    if (captchaCharsCollection?.length) return captchaCharsCollection
    switch (collectionStringType) {
        case "abc123Friendly": return abc123Friendly
        case "abc123Complete": return abc123Complete
        case "abcComplete": return abc123Complete
        case "abcLowerCase": return abcLowerCase
        case "abcUpperCase": return abcUpperCase
        case "numbers": return numbers
        default: return abc123Friendly
    }

}


export const isDarkModePerefered = (): boolean => {
    if (typeof window === 'object') {
        const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkMode) return true
    }
    return false
}

