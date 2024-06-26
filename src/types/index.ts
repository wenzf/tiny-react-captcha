import { HTMLAttributes } from "react"

export type CaptchaProps = {
    okCallback: (e: true) => void
    failCallback?: (e: true) => void
    stringMinLen?: 1 | 2 | 3 | 4 | 5 | 6 | 7
    stringMaxLen?: 1 | 2 | 3 | 4 | 5 | 6 | 7
    captchaStringType?: CaptchaStringType
    captchaCharsCollection?: string
    caseSensitive?: boolean
    timeBeforeInputInMS?: number
    maxAttempts?: number
    perferedTheme?: PreferedTheme
    language?: CaptchaLanguage
    useStyleSheet?: boolean

    htmlPropsForm?: HTMLAttributes<HTMLFormElement>
    htmlPropsTitle?: HTMLAttributes<HTMLDivElement>
    htmlPropsCanvasFrame?: HTMLAttributes<HTMLDivElement>
    htmlPropsCanvas?: HTMLAttributes<HTMLCanvasElement>
    htmlPropsRefreshButton?: HTMLAttributes<HTMLButtonElement>
    htmlPropsInputFrame?: HTMLAttributes<HTMLFieldSetElement>
    htmlPropsLabel?: HTMLAttributes<HTMLLabelElement>
    htmlPropsLabelText?: HTMLAttributes<HTMLSpanElement>
    htmlPropsInput?: HTMLAttributes<HTMLInputElement>
    htmlPropsOkButton?: HTMLAttributes<HTMLButtonElement>
    htmlPropsFail?: HTMLAttributes<HTMLDivElement>

    textTitle?: string
    textTryAgain?: string
    textEnterCaptcha?: string
    textOk?: string
    textFail?: string

}

export type CaptchaLanguage = "en" | "de" | "fr" | "it" | "zh" | "es" | "pt"

export type BehaviourItems = Record<string, {
    down: number
    up: number
    isTrusted: number
    isNotTrusted: number
    mouseMove?: number
    numbTab?: number
}>

export type ClientInfo = {
    screenAvailHeight: number[]
    screenAvailWidth: number[]
    movements: number[][]
}

export type PreferedTheme = "dark" | "light" | "auto"

export type BehaviourEvents = "touchend" | "touchstart" | "mouseup" | "mousemove" | "mousedown" | "keydown" | "keyup"

export type CaptchaStringType = "abcLowerCase" | "abcUpperCase" | "numbers" | "abc123Complete" | "abcComplete" | "abc123Friendly" | "custom"

export type CaptchaText = Record<CaptchaLanguage,
    {
        title: string
        enterCaptcha: string
        tryAgain: string
        fail: string
    }>


