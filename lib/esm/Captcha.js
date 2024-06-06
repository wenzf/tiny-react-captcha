import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from "react";
import { getCharCollection, randomNumber, randomString } from "./captchaHelpers";
import { CAPTCHA_DEFAULTS, CAPTCHA_TEXTS, USER_INPUT_EVENTS, behaviourInit, clientInfoInit } from "./constants";
import { drawCaptchaOnCanvas } from "./canvas";
import { checkBehaviour, isLine, isStrangeDimension, onUserInputCB } from "./behaviourUtils";
// import './css.css';
import { keepInputsIneractive, resetInputsInteractivity } from "./dom";
import { UpdateIconSVG } from "./res/UpdateIconSVG";
import { CircleCheckIconSVG } from "./res/CircleCheckIconSVG";
import { CircleCrossSVG } from "./res/CircleCrossIconSVG";
export const Captcha = ({ okCallback, stringMinLen, stringMaxLen, captchaStringType, captchaCharsCollection, caseSensitive, timeBeforeInputInMS, maxAttempts, perferedTheme, language, useStyleSheet, htmlPropsForm, htmlPropsTitle, htmlPropsCanvasFrame, htmlPropsCanvas, htmlPropsRefreshButton, htmlPropsOkButton, htmlPropsInputFrame, htmlPropsLabel, htmlPropsLabelText, htmlPropsInput, htmlPropsFail, textTitle, textTryAgain, textEnterCaptcha, textOk, textFail, failCallback }) => {
    const _stringMinLen = stringMinLen ?? CAPTCHA_DEFAULTS.STRING_MIN_LENGTH;
    const _stringMaxLen = stringMaxLen ?? CAPTCHA_DEFAULTS.STRING_MAX_LENGTH;
    const _timeBeforeInputsInMs = timeBeforeInputInMS ?? CAPTCHA_DEFAULTS.TIME_BEFORE_INPUTS;
    const _maxAttempts = maxAttempts ?? CAPTCHA_DEFAULTS.MAX_ATTEMPTS;
    const _preferedTheme = perferedTheme ?? CAPTCHA_DEFAULTS.PREFERED_THEME;
    const _langauge = language ?? CAPTCHA_DEFAULTS.LANGAUGE;
    const _useStyleSheet = useStyleSheet ?? CAPTCHA_DEFAULTS.USE_STYLE_SHEET;
    const timeOpenRef = useRef(Date.now());
    const canvasRef = useRef(null);
    const inputRef = useRef(null);
    const behaviourRef = useRef(behaviourInit);
    const clientInfoRef = useRef(clientInfoInit);
    const texts = CAPTCHA_TEXTS[_langauge ?? 'en'];
    const charCollection = getCharCollection(captchaStringType, captchaCharsCollection);
    const captchaStringRef = useRef(randomString(randomNumber(_stringMinLen, _stringMaxLen), charCollection));
    const [attempts, setAttempts] = useState(0);
    const [captchaInput, setCaptchaInput] = useState('');
    const [numberOfTypes, setNumberOfTypes] = useState(0);
    const [tryAgain, setTryAgain] = useState(false);
    const [didFail, setDidFail] = useState(false);
    const [didSuceed, setDidSucced] = useState(false);
    const onTypeToForm = (e) => {
        setNumberOfTypes((prev) => prev + 1);
        setCaptchaInput(e.target.value);
        setTryAgain(false);
    };
    const onChangeCaptcha = () => {
        setNumberOfTypes(0);
        timeOpenRef.current = Date.now();
        captchaStringRef.current = randomString(randomNumber(_stringMinLen, _stringMaxLen), charCollection);
        setAttempts((prev) => prev + 1);
        if (inputRef.current)
            inputRef.current.value = '';
        behaviourRef.current = behaviourInit;
        clientInfoRef.current = clientInfoInit;
    };
    // @ts-expect-error
    const onCheckCaptcha = (e) => {
        e.preventDefault();
        const inputOK = caseSensitive
            ? captchaInput === captchaStringRef.current
            : captchaInput.toLowerCase() === captchaStringRef.current.toLowerCase();
        const timeOk = timeOpenRef.current + _timeBeforeInputsInMs < Date.now();
        const numberOfTypesOk = numberOfTypes >= captchaInput.length;
        const isBehaviourOk = checkBehaviour(behaviourRef);
        const isMovementLine = isLine(clientInfoRef.current.movements);
        const isDeviceWidthUnrealisticOrUnstable = isStrangeDimension(clientInfoInit.screenAvailWidth);
        const isDeviceHeightUnrealisticOrUnstable = isStrangeDimension(clientInfoInit.screenAvailHeight);
        if (inputOK
            && timeOk
            && numberOfTypesOk
            && isBehaviourOk
            && !isMovementLine
            && !isDeviceHeightUnrealisticOrUnstable
            && !isDeviceWidthUnrealisticOrUnstable) {
            setDidSucced(true);
            const timeout = setTimeout(() => okCallback(true), 2000);
            return () => timeout;
        }
        else {
            setAttempts((prev) => prev + 1);
            onChangeCaptcha();
            setTryAgain(true);
        }
    };
    const themeCSSClass = useCallback(() => {
        if (_preferedTheme === 'auto') {
            return '';
        }
        else if (_preferedTheme === 'dark') {
            return ' trc-theme-dark';
        }
        else {
            return ' trc-theme-light';
        }
    }, [_preferedTheme])();
    const onUserInput = useCallback(() => onUserInputCB, [])();
    const listeners = {
        onKeyDown: (e) => onUserInput(USER_INPUT_EVENTS.KEY_DOWN, e, behaviourRef, clientInfoRef),
        onKeyUp: (e) => onUserInput(USER_INPUT_EVENTS.KEY_UP, e, behaviourRef, clientInfoRef),
        onMouseDown: (e) => onUserInput(USER_INPUT_EVENTS.MOUSE_DOWN, e, behaviourRef, clientInfoRef),
        onMouseUp: (e) => onUserInput(USER_INPUT_EVENTS.MOUSE_UP, e, behaviourRef, clientInfoRef),
        onMouseMove: (e) => onUserInput(USER_INPUT_EVENTS.MOUSE_MOVE, e, behaviourRef, clientInfoRef),
        onTouchStart: (e) => onUserInput(USER_INPUT_EVENTS.TOUCH_START, e, behaviourRef, clientInfoRef),
        onTouchEnd: (e) => onUserInput(USER_INPUT_EVENTS.TOUCH_END, e, behaviourRef, clientInfoRef)
    };
    useEffect(() => {
        if (attempts < _maxAttempts) {
            setCaptchaInput('');
            if (canvasRef?.current?.getContext('2d')) {
                const ctx = canvasRef.current.getContext('2d');
                if (ctx)
                    drawCaptchaOnCanvas(ctx, captchaStringRef.current, _preferedTheme);
            }
        }
        else {
            setDidFail(true);
            if (typeof failCallback === 'function')
                failCallback(true);
        }
    }, [attempts, _maxAttempts, _preferedTheme, failCallback]);
    useEffect(() => {
        keepInputsIneractive();
        return () => resetInputsInteractivity();
    }, []);
    return (_jsx("div", { className: `trc-fr${themeCSSClass}`, children: !didFail
            ? (_jsxs(_Fragment, { children: [_jsx("input", { name: "capturing_user_events", tabIndex: -1, "data-captcha": "listener", ..._useStyleSheet ? { className: 'trc-bgli' } : {}, readOnly: true, type: "text", ...listeners }), _jsx("form", { ...htmlPropsForm, ..._useStyleSheet ? { className: 'trc-visbx' } : {}, children: !didSuceed ? (_jsxs(_Fragment, { children: [_jsx("div", { ..._useStyleSheet ? { className: 'trc-tit' } : {}, ...htmlPropsTitle, children: textTitle ?? texts.title }), _jsxs("div", { ..._useStyleSheet ? { className: 'trc-can' } : {}, ...htmlPropsCanvasFrame, children: [_jsx("canvas", { ...htmlPropsCanvas, ...listeners, ref: canvasRef }), _jsx("button", { title: "renew captcha", ..._useStyleSheet ? { className: 'trc-cainp trc-up' } : {}, type: "button", ...listeners, onClick: () => onChangeCaptcha(), "data-captcha": "listener", ...htmlPropsRefreshButton, children: _jsx(UpdateIconSVG, { "aria-label": "renew captcha" }) })] }), _jsxs("fieldset", { ...htmlPropsInputFrame, ..._useStyleSheet ? { className: 'trc-ifr' } : {}, children: [_jsxs("label", { htmlFor: "trc-captcha", className: "trc-cala", ...htmlPropsLabel, children: [_jsx("span", { ...htmlPropsLabelText, ..._useStyleSheet ? { className: 'trc-lt' } : {}, children: tryAgain
                                                        ? (textTryAgain ?? texts.tryAgain)
                                                        : (textEnterCaptcha ?? texts.enterCaptcha) }), _jsx("input", { ..._useStyleSheet ? { className: 'trc-cainp trc-es' } : {}, ref: inputRef, type: "text", id: "trc-captcha", ...listeners, onChange: (e) => onTypeToForm(e), "data-captcha": "listener", autoComplete: "false", ...htmlPropsInput })] }), _jsx("button", { disabled: !inputRef.current?.value.length, ..._useStyleSheet ? { className: 'trc-cainp trc-ok' } : {}, type: "submit", onClick: (e) => onCheckCaptcha(e), ...listeners, "data-captcha": "listener", ...htmlPropsOkButton, children: textOk ?? 'OK' })] })] })) : (_jsx("div", { ..._useStyleSheet ? { className: 'trc-success' } : {}, children: _jsx(CircleCheckIconSVG, { "aria-label": "success" }) })) })] })) : (_jsxs("div", { ..._useStyleSheet ? { className: 'trc-visbx' } : {}, ...htmlPropsFail, children: [_jsx("div", { ..._useStyleSheet ? { className: 'trc-fail' } : {}, children: _jsx(CircleCrossSVG, { "aria-label": "fail" }) }), _jsx("div", { ..._useStyleSheet ? { className: 'trc-failtxt' } : {}, children: textFail ?? texts.fail })] })) }));
};
