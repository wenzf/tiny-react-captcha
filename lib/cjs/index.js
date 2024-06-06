"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Captcha_1 = require("./Captcha");
const TinyReactCaptcha = (props) => {
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(Captcha_1.Captcha, { ...props }) }));
};
exports.default = TinyReactCaptcha;
