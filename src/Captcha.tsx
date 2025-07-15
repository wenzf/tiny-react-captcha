/* eslint-disable react/react-in-jsx-scope */
import { BaseSyntheticEvent, SyntheticEvent, useCallback, useEffect, useRef, useState } from "react"
import { getCharCollection, randomNumber, randomString } from "./utils/helpers"
import { CAPTCHA_DEFAULTS, CAPTCHA_TEXTS, USER_INPUT_EVENTS, behaviourInit, clientInfoInit } from "./constants"
import { drawCaptchaOnCanvas } from "./utils/canvas"
import { checkBehaviour, isLine, isStrangeDimension, onUserInputCB } from "./utils/behaviour"
import { CaptchaLanguage, CaptchaProps, CaptchaText } from "./types"
import { keepInputsIneractive, resetInputsInteractivity } from "./utils/dom"
import { UpdateIconSVG } from "./res/UpdateIconSVG"
import { CircleCheckIconSVG } from "./res/CircleCheckIconSVG"
import { CircleCrossSVG } from "./res/CircleCrossIconSVG"


export const Captcha = ({
    okCallback,
    stringMinLen,
    stringMaxLen,
    captchaStringType,
    captchaCharsCollection,
    caseSensitive,
    timeBeforeInputInMS,
    maxAttempts,
    perferedTheme,
    language,
    useStyleSheet,

    htmlPropsForm,
    htmlPropsTitle,
    htmlPropsCanvasFrame,
    htmlPropsCanvas,
    htmlPropsRefreshButton,
    htmlPropsOkButton,
    htmlPropsInputFrame,
    htmlPropsLabel,
    htmlPropsLabelText,
    htmlPropsInput,
    htmlPropsFail,

    textTitle,
    textTryAgain,
    textEnterCaptcha,
    textOk,
    textFail,
    failCallback

}: CaptchaProps
) => {
    const _stringMinLen = stringMinLen ?? CAPTCHA_DEFAULTS.STRING_MIN_LENGTH
    const _stringMaxLen = stringMaxLen ?? CAPTCHA_DEFAULTS.STRING_MAX_LENGTH
    const _timeBeforeInputsInMs = timeBeforeInputInMS ?? CAPTCHA_DEFAULTS.TIME_BEFORE_INPUTS
    const _maxAttempts = maxAttempts ?? CAPTCHA_DEFAULTS.MAX_ATTEMPTS
    const _preferedTheme = perferedTheme ?? CAPTCHA_DEFAULTS.PREFERED_THEME
    const _langauge: CaptchaLanguage = language ?? CAPTCHA_DEFAULTS.LANGAUGE;
    const _useStyleSheet = useStyleSheet ?? CAPTCHA_DEFAULTS.USE_STYLE_SHEET

    const timeOpenRef = useRef(Date.now())
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const behaviourRef = useRef(behaviourInit)
    const clientInfoRef = useRef(clientInfoInit)

    const texts: CaptchaText[CaptchaLanguage] = CAPTCHA_TEXTS[_langauge ?? 'en' as CaptchaLanguage];

    const charCollection = getCharCollection(captchaStringType, captchaCharsCollection)

    const captchaStringRef = useRef(
        randomString(
            randomNumber(_stringMinLen, _stringMaxLen),
            charCollection
        )
    )
    const [attempts, setAttempts] = useState(0)
    const [captchaInput, setCaptchaInput] = useState('')
    const [numberOfTypes, setNumberOfTypes] = useState(0)
    const [tryAgain, setTryAgain] = useState(false)
    const [didFail, setDidFail] = useState(false)
    const [didSuceed, setDidSucced] = useState(false)

    const onTypeToForm = (e: BaseSyntheticEvent) => {
        setNumberOfTypes((prev) => prev + 1)
        setCaptchaInput(e.target.value)
        setTryAgain(false)
    }

    const onChangeCaptcha = () => {
        setNumberOfTypes(0)
        timeOpenRef.current = Date.now()
        captchaStringRef.current = randomString(
            randomNumber(_stringMinLen, _stringMaxLen),
            charCollection
        )
        setAttempts((prev) => prev + 1)
        if (inputRef.current) inputRef.current.value = ''
        behaviourRef.current = behaviourInit
        clientInfoRef.current = clientInfoInit;
    }

    // @ts-expect-error todo: add correct type
    const onCheckCaptcha = (e: BaseSyntheticEvent) => {
        e.preventDefault()
        const inputOK = caseSensitive
            ? captchaInput === captchaStringRef.current
            : captchaInput.toLowerCase() === captchaStringRef.current.toLowerCase()

        // is too fast?    
        const timeOk = timeOpenRef.current + _timeBeforeInputsInMs < Date.now()

        // is input typed?
        const numberOfTypesOk = numberOfTypes >= captchaInput.length

        // any suspicious inputs?
        const isBehaviourOk = checkBehaviour(behaviourRef)

        // moving as straight line?
        const isMovementLine = isLine(clientInfoRef.current.movements);

        // is device large enough?
        const isDeviceWidthUnrealisticOrUnstable = isStrangeDimension(clientInfoInit.screenAvailWidth);
        const isDeviceHeightUnrealisticOrUnstable = isStrangeDimension(clientInfoInit.screenAvailHeight);

        if (
            inputOK
            && timeOk
            && numberOfTypesOk
            && isBehaviourOk
            && !isMovementLine
            && !isDeviceHeightUnrealisticOrUnstable
            && !isDeviceWidthUnrealisticOrUnstable
        ) {
            setDidSucced(true)
            const timeout = setTimeout(() => okCallback(true), 2000)
            return () => timeout;
        } else {
            setAttempts((prev) => prev + 1);
            onChangeCaptcha();
            setTryAgain(true);
        }
    }

    const themeCSSClass = useCallback(() => {
        if (_preferedTheme === 'auto') {
            return ''
        } else if (_preferedTheme === 'dark') {
            return ' trc-theme-dark'
        } else {
            return ' trc-theme-light'
        }
    }, [_preferedTheme])()


    const onUserInput = useCallback(() => onUserInputCB, [])()

    const listeners = {
        onKeyDown: (e: SyntheticEvent) => onUserInput(USER_INPUT_EVENTS.KEY_DOWN, e, behaviourRef, clientInfoRef),
        onKeyUp: (e: SyntheticEvent) => onUserInput(USER_INPUT_EVENTS.KEY_UP, e, behaviourRef, clientInfoRef),
        onMouseDown: (e: SyntheticEvent) => onUserInput(USER_INPUT_EVENTS.MOUSE_DOWN, e, behaviourRef, clientInfoRef),
        onMouseUp: (e: SyntheticEvent) => onUserInput(USER_INPUT_EVENTS.MOUSE_UP, e, behaviourRef, clientInfoRef),
        onMouseMove: (e: SyntheticEvent) => onUserInput(USER_INPUT_EVENTS.MOUSE_MOVE, e, behaviourRef, clientInfoRef),
        onTouchStart: (e: SyntheticEvent) => onUserInput(USER_INPUT_EVENTS.TOUCH_START, e, behaviourRef, clientInfoRef),
        onTouchEnd: (e: SyntheticEvent) => onUserInput(USER_INPUT_EVENTS.TOUCH_END, e, behaviourRef, clientInfoRef)
    }

    useEffect(() => {
        if (attempts < _maxAttempts) {
            setCaptchaInput('')
            if (canvasRef?.current?.getContext('2d')) {
                const ctx = canvasRef.current.getContext('2d')
                if (ctx) drawCaptchaOnCanvas(ctx, captchaStringRef.current, _preferedTheme)
            }
        } else {
            setDidFail(true)
            if (typeof failCallback === 'function') failCallback(true)
        }
    }, [attempts, _maxAttempts, _preferedTheme, failCallback])

  useEffect(() => {
      /**
       * in the background a fixed input element with z-index=0 is used to detect user inputs. In oder to
       * keep other input elements are still clickable, those styles are temporarilly changed.
       */
      keepInputsIneractive()
      return () => resetInputsInteractivity()
  }, [])


    return (
        <div
            className={`trc-fr${themeCSSClass}`}
        >
            {!didFail
                ? (
                    <>

                        <input
                            aria-label="Captcha"
                            name="capturing_user_events"
                            tabIndex={-1}
                            data-captcha="listener"
                            {..._useStyleSheet ? { className: 'trc-bgli' } : {}}
                            readOnly
                            style={{
                                opacity: 0,
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                cursor: 'default',
                                height: '100%',
                                width: '100%'
                            }}
                            type="text"
                            {...listeners}
                        />

                        <form
                            {...htmlPropsForm}
                            {..._useStyleSheet ? { className: 'trc-visbx' } : {}}
                        >
                            {!didSuceed ? (
                                <>
                                    <div
                                        {..._useStyleSheet ? { className: 'trc-tit' } : {}}
                                        {...htmlPropsTitle}
                                    >
                                        {textTitle ?? texts.title}
                                    </div>
                                    <div
                                        {..._useStyleSheet ? { className: 'trc-can' } : {}}
                                        {...htmlPropsCanvasFrame}
                                    >
                                        <canvas
                                            {...htmlPropsCanvas}
                                            {...listeners}
                                            ref={canvasRef}
                                        />
                                        <button
                                            title="renew captcha"
                                            {..._useStyleSheet ? { className: 'trc-cainp trc-up' } : {}}
                                            type="button"
                                            {...listeners}
                                            onClick={() => onChangeCaptcha()}
                                            data-captcha="listener"
                                            {...htmlPropsRefreshButton}
                                            style={{border: 'none', backgroundColor: 'transparent'}}
                                        >
                                            <UpdateIconSVG
                                                aria-label="renew captcha"
                                            />
                                        </button>
                                    </div>

                                    <fieldset
                                        {...htmlPropsInputFrame}
                                        {..._useStyleSheet ? { className: 'trc-ifr' } : {}}
                                    >
                                        <label
                                            htmlFor="trc-captcha"
                                            className="trc-cala"
                                            {...htmlPropsLabel}
                                        >
                                            <span
                                                {...htmlPropsLabelText}
                                                {..._useStyleSheet ? { className: 'trc-lt' } : {}}
                                            >
                                                {tryAgain
                                                    ? (textTryAgain ?? texts.tryAgain)
                                                    : (textEnterCaptcha ?? texts.enterCaptcha)
                                                }
                                            </span>

                                            <input
                                                {..._useStyleSheet ? { className: 'trc-cainp trc-es' } : {}}
                                                ref={inputRef}
                                                type="text"
                                                id="trc-captcha"
                                                {...listeners}
                                                onChange={(e) => onTypeToForm(e)}
                                                data-captcha="listener"
                                                autoComplete="false"
                                                {...htmlPropsInput}
                                            />
                                        </label>
                                        <button
                                            disabled={!inputRef.current?.value.length}
                                            {..._useStyleSheet ? { className: 'trc-cainp trc-ok' } : {}}
                                            type="submit"
                                            onClick={(e) => onCheckCaptcha(e)}
                                            {...listeners}
                                            data-captcha="listener"
                                            {...htmlPropsOkButton}
                                        >
                                            {textOk ?? 'OK'}
                                        </button>
                                    </fieldset>
                                </>
                            ) : (
                                <div
                                    {..._useStyleSheet ? { className: 'trc-success' } : {}}
                                >
                                    <CircleCheckIconSVG
                                        aria-label="success"
                                    />
                                </div>
                            )}
                        </form>
                    </>
                ) : (
                    <div
                        {..._useStyleSheet ? { className: 'trc-visbx' } : {}}
                        {...htmlPropsFail}
                    >
                        <div
                            {..._useStyleSheet ? { className: 'trc-fail' } : {}}
                        >
                            <CircleCrossSVG aria-label="fail" />
                        </div>
                        <div
                            {..._useStyleSheet ? { className: 'trc-failtxt' } : {}}
                        >
                            {textFail ?? texts.fail}
                        </div>
                    </div>
                )}
        </div>
    )
}


