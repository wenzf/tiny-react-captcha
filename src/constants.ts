import { BehaviourEvents, BehaviourItems, CaptchaLanguage, CaptchaText, ClientInfo, PreferedTheme } from "./types";

export const behaviourInit: BehaviourItems = {
    keyboard: {
        numbTab: 0,
        up: 0,
        down: 0,
        isTrusted: 0,
        isNotTrusted: 0
    },
    mouse: {
        down: 0,
        up: 0,
        mouseMove: 0,
        isTrusted: 0,
        isNotTrusted: 0
    },
    touch: {
        down: 0,
        up: 0,
        isTrusted: 0,
        isNotTrusted: 0
    }
}

export const clientInfoInit: ClientInfo = {
    screenAvailHeight: [],
    screenAvailWidth: [],
    movements: []
}

export const canvasFonts = ['Arial', 'Verdana', 'Times New Roman', 'Courier New', 'Georgia'];


export const abcLowerCase = "abcdefghijklmnopqrstuvwxyz";
export const abcUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const numbers = "0123456789"
export const abc123Complete = abcLowerCase + abcUpperCase + numbers;
export const abcComplete = abcLowerCase + abcUpperCase;
export const abc123Friendly = "ABCDEFGHJKMNPQRTUWXYZabcdefghijkmnpqrtwxyz0123456789";

export const USER_INPUT_EVENTS:Record<string, BehaviourEvents> = Object.freeze({
    KEY_DOWN: 'keydown',
    KEY_UP: 'keyup',
    MOUSE_DOWN: 'mousedown',
    MOUSE_UP: 'mouseup',
    MOUSE_MOVE: 'mousemove',
    TOUCH_START: 'touchstart',
    TOUCH_END: 'touchend'
})

export const CAPTCHA_DEFAULTS = Object.freeze({
    STRING_MIN_LENGTH: 4,
    STRING_MAX_LENGTH: 6,
    TIME_BEFORE_INPUTS: 2_000,
    MAX_ATTEMPTS: 4,
    PREFERED_THEME: 'auto' as PreferedTheme,
    LANGAUGE: "en" as CaptchaLanguage,
    USE_STYLE_SHEET: true
})


export const CAPTCHA_TEXTS: CaptchaText = {
    en: {
        title: 'Are you human?',
        enterCaptcha: 'Enter captcha',
        tryAgain: 'That\'s wrong, try again!',
        fail: "Are you really human?!"
    },
    de: {
        title: 'Bist du menschlich?',
        enterCaptcha: 'Captcha eingeben',
        tryAgain: 'Das war falsch, versuche es nochmals!',
        fail: "Bist du wirklich menschlich?!"
    },
    fr: {
        title: 'Êtes-vous humain ?',
        enterCaptcha: 'Saisissez le captcha',
        tryAgain: 'Faux ! Essayez encore.',
        fail: "Êtes-vous vraiment humain ?!"
    },
    it: {
        title: 'Sei umano?',
        enterCaptcha: 'Inserisci il captcha',
        tryAgain: 'Sbagliato! Riprova.',
        fail: "Sei davvero umano?!"
    },
    pt: {
        title: 'É humano?',
        enterCaptcha: 'Digite o captcha',
        tryAgain: 'Errado! Tente novamente.',
        fail: "Você é realmente humano?!"
    },
    es: {
        title: '¿Eres humano?',
        enterCaptcha: 'Ingresa el captcha',
        tryAgain: '¡Incorrecto! Inténtalo de nuevo.',
        fail: "¿¡Realmente eres humano?!"
    },
    zh: {
        title: '你是人类吗？',  // 你 (nǐ) - you, 人类 (rénlèi) - human
        enterCaptcha: '输入验证码',  // 输入 (shurù) - enter, 验证码 (yànzhèngmǎ) - captcha
        tryAgain: '错误！请重试。',  // 错误 (cuòwù) - wrong, 请 (qǐng) - please, 重试 (chóngshì) - try again
        fail: "你真的不是人类吗？!"  // 你 (nǐ) - you, 真正的 (zhēnzhèng de) - really not, 人类 (rénlèi) - human
    },

}