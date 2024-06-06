"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Captcha = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
// import * as React from 'react';
const react_1 = require("react");
const captchaHelpers_1 = require("./captchaHelpers");
const constants_1 = require("./constants");
const canvas_1 = require("./canvas");
const behaviourUtils_1 = require("./behaviourUtils");
// import './css.css';
const dom_1 = require("./dom");
const UpdateIconSVG_1 = require("./res/UpdateIconSVG");
const CircleCheckIconSVG_1 = require("./res/CircleCheckIconSVG");
const CircleCrossIconSVG_1 = require("./res/CircleCrossIconSVG");
const Captcha = ({ okCallback, stringMinLen, stringMaxLen, captchaStringType, captchaCharsCollection, caseSensitive, timeBeforeInputInMS, maxAttempts, perferedTheme, language, useStyleSheet, htmlPropsForm, htmlPropsTitle, htmlPropsCanvasFrame, htmlPropsCanvas, htmlPropsRefreshButton, htmlPropsOkButton, htmlPropsInputFrame, htmlPropsLabel, htmlPropsLabelText, htmlPropsInput, htmlPropsFail, textTitle, textTryAgain, textEnterCaptcha, textOk, textFail, failCallback }) => {
    const _stringMinLen = stringMinLen ?? constants_1.CAPTCHA_DEFAULTS.STRING_MIN_LENGTH;
    const _stringMaxLen = stringMaxLen ?? constants_1.CAPTCHA_DEFAULTS.STRING_MAX_LENGTH;
    const _timeBeforeInputsInMs = timeBeforeInputInMS ?? constants_1.CAPTCHA_DEFAULTS.TIME_BEFORE_INPUTS;
    const _maxAttempts = maxAttempts ?? constants_1.CAPTCHA_DEFAULTS.MAX_ATTEMPTS;
    const _preferedTheme = perferedTheme ?? constants_1.CAPTCHA_DEFAULTS.PREFERED_THEME;
    const _langauge = language ?? constants_1.CAPTCHA_DEFAULTS.LANGAUGE;
    const _useStyleSheet = useStyleSheet ?? constants_1.CAPTCHA_DEFAULTS.USE_STYLE_SHEET;
    const timeOpenRef = (0, react_1.useRef)(Date.now());
    const canvasRef = (0, react_1.useRef)(null);
    const inputRef = (0, react_1.useRef)(null);
    const behaviourRef = (0, react_1.useRef)(constants_1.behaviourInit);
    const clientInfoRef = (0, react_1.useRef)(constants_1.clientInfoInit);
    const texts = constants_1.CAPTCHA_TEXTS[_langauge ?? 'en'];
    const charCollection = (0, captchaHelpers_1.getCharCollection)(captchaStringType, captchaCharsCollection);
    const captchaStringRef = (0, react_1.useRef)((0, captchaHelpers_1.randomString)((0, captchaHelpers_1.randomNumber)(_stringMinLen, _stringMaxLen), charCollection));
    const [attempts, setAttempts] = (0, react_1.useState)(0);
    const [captchaInput, setCaptchaInput] = (0, react_1.useState)('');
    const [numberOfTypes, setNumberOfTypes] = (0, react_1.useState)(0);
    const [tryAgain, setTryAgain] = (0, react_1.useState)(false);
    const [didFail, setDidFail] = (0, react_1.useState)(false);
    const [didSuceed, setDidSucced] = (0, react_1.useState)(false);
    const onTypeToForm = (e) => {
        setNumberOfTypes((prev) => prev + 1);
        setCaptchaInput(e.target.value);
        setTryAgain(false);
    };
    const onChangeCaptcha = () => {
        setNumberOfTypes(0);
        timeOpenRef.current = Date.now();
        captchaStringRef.current = (0, captchaHelpers_1.randomString)((0, captchaHelpers_1.randomNumber)(_stringMinLen, _stringMaxLen), charCollection);
        setAttempts((prev) => prev + 1);
        if (inputRef.current)
            inputRef.current.value = '';
        behaviourRef.current = constants_1.behaviourInit;
        clientInfoRef.current = constants_1.clientInfoInit;
    };
    // @ts-expect-error
    const onCheckCaptcha = (e) => {
        e.preventDefault();
        const inputOK = caseSensitive
            ? captchaInput === captchaStringRef.current
            : captchaInput.toLowerCase() === captchaStringRef.current.toLowerCase();
        const timeOk = timeOpenRef.current + _timeBeforeInputsInMs < Date.now();
        const numberOfTypesOk = numberOfTypes >= captchaInput.length;
        const isBehaviourOk = (0, behaviourUtils_1.checkBehaviour)(behaviourRef);
        const isMovementLine = (0, behaviourUtils_1.isLine)(clientInfoRef.current.movements);
        const isDeviceWidthUnrealisticOrUnstable = (0, behaviourUtils_1.isStrangeDimension)(constants_1.clientInfoInit.screenAvailWidth);
        const isDeviceHeightUnrealisticOrUnstable = (0, behaviourUtils_1.isStrangeDimension)(constants_1.clientInfoInit.screenAvailHeight);
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
    const themeCSSClass = (0, react_1.useCallback)(() => {
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
    const onUserInput = (0, react_1.useCallback)(() => behaviourUtils_1.onUserInputCB, [])();
    const listeners = {
        onKeyDown: (e) => onUserInput(constants_1.USER_INPUT_EVENTS.KEY_DOWN, e, behaviourRef, clientInfoRef),
        onKeyUp: (e) => onUserInput(constants_1.USER_INPUT_EVENTS.KEY_UP, e, behaviourRef, clientInfoRef),
        onMouseDown: (e) => onUserInput(constants_1.USER_INPUT_EVENTS.MOUSE_DOWN, e, behaviourRef, clientInfoRef),
        onMouseUp: (e) => onUserInput(constants_1.USER_INPUT_EVENTS.MOUSE_UP, e, behaviourRef, clientInfoRef),
        onMouseMove: (e) => onUserInput(constants_1.USER_INPUT_EVENTS.MOUSE_MOVE, e, behaviourRef, clientInfoRef),
        onTouchStart: (e) => onUserInput(constants_1.USER_INPUT_EVENTS.TOUCH_START, e, behaviourRef, clientInfoRef),
        onTouchEnd: (e) => onUserInput(constants_1.USER_INPUT_EVENTS.TOUCH_END, e, behaviourRef, clientInfoRef)
    };
    (0, react_1.useEffect)(() => {
        if (attempts < _maxAttempts) {
            setCaptchaInput('');
            if (canvasRef?.current?.getContext('2d')) {
                const ctx = canvasRef.current.getContext('2d');
                if (ctx)
                    (0, canvas_1.drawCaptchaOnCanvas)(ctx, captchaStringRef.current, _preferedTheme);
            }
        }
        else {
            setDidFail(true);
            if (typeof failCallback === 'function')
                failCallback(true);
        }
    }, [attempts, _maxAttempts, _preferedTheme, failCallback]);
    (0, react_1.useEffect)(() => {
        (0, dom_1.keepInputsIneractive)();
        return () => (0, dom_1.resetInputsInteractivity)();
    }, []);
    return ((0, jsx_runtime_1.jsx)("div", { className: `trc-fr${themeCSSClass}`, children: !didFail
            ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("input", { name: "capturing_user_events", tabIndex: -1, "data-captcha": "listener", ..._useStyleSheet ? { className: 'trc-bgli' } : {}, readOnly: true, type: "text", ...listeners }), (0, jsx_runtime_1.jsx)("form", { ...htmlPropsForm, ..._useStyleSheet ? { className: 'trc-visbx' } : {}, children: !didSuceed ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { ..._useStyleSheet ? { className: 'trc-tit' } : {}, ...htmlPropsTitle, children: textTitle ?? texts.title }), (0, jsx_runtime_1.jsxs)("div", { ..._useStyleSheet ? { className: 'trc-can' } : {}, ...htmlPropsCanvasFrame, children: [(0, jsx_runtime_1.jsx)("canvas", { ...htmlPropsCanvas, ...listeners, ref: canvasRef }), (0, jsx_runtime_1.jsx)("button", { title: "renew captcha", ..._useStyleSheet ? { className: 'trc-cainp trc-up' } : {}, type: "button", ...listeners, onClick: () => onChangeCaptcha(), "data-captcha": "listener", ...htmlPropsRefreshButton, children: (0, jsx_runtime_1.jsx)(UpdateIconSVG_1.UpdateIconSVG, { "aria-label": "renew captcha" }) })] }), (0, jsx_runtime_1.jsxs)("fieldset", { ...htmlPropsInputFrame, ..._useStyleSheet ? { className: 'trc-ifr' } : {}, children: [(0, jsx_runtime_1.jsxs)("label", { htmlFor: "trc-captcha", className: "trc-cala", ...htmlPropsLabel, children: [(0, jsx_runtime_1.jsx)("span", { ...htmlPropsLabelText, ..._useStyleSheet ? { className: 'trc-lt' } : {}, children: tryAgain
                                                        ? (textTryAgain ?? texts.tryAgain)
                                                        : (textEnterCaptcha ?? texts.enterCaptcha) }), (0, jsx_runtime_1.jsx)("input", { ..._useStyleSheet ? { className: 'trc-cainp trc-es' } : {}, ref: inputRef, type: "text", id: "trc-captcha", ...listeners, onChange: (e) => onTypeToForm(e), "data-captcha": "listener", autoComplete: "false", ...htmlPropsInput })] }), (0, jsx_runtime_1.jsx)("button", { disabled: !inputRef.current?.value.length, ..._useStyleSheet ? { className: 'trc-cainp trc-ok' } : {}, type: "submit", onClick: (e) => onCheckCaptcha(e), ...listeners, "data-captcha": "listener", ...htmlPropsOkButton, children: textOk ?? 'OK' })] })] })) : ((0, jsx_runtime_1.jsx)("div", { ..._useStyleSheet ? { className: 'trc-success' } : {}, children: (0, jsx_runtime_1.jsx)(CircleCheckIconSVG_1.CircleCheckIconSVG, { "aria-label": "success" }) })) })] })) : ((0, jsx_runtime_1.jsxs)("div", { ..._useStyleSheet ? { className: 'trc-visbx' } : {}, ...htmlPropsFail, children: [(0, jsx_runtime_1.jsx)("div", { ..._useStyleSheet ? { className: 'trc-fail' } : {}, children: (0, jsx_runtime_1.jsx)(CircleCrossIconSVG_1.CircleCrossSVG, { "aria-label": "fail" }) }), (0, jsx_runtime_1.jsx)("div", { ..._useStyleSheet ? { className: 'trc-failtxt' } : {}, children: textFail ?? texts.fail })] })) }));
};
exports.Captcha = Captcha;
