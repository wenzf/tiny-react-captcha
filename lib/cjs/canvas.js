"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawCaptchaOnCanvas = void 0;
// import { CanvasHTMLAttributes } from "react";
const captchaHelpers_1 = require("./captchaHelpers");
const constants_1 = require("./constants");
const drawCaptchaOnCanvas = (ctx, captcha, perferedTheme) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    let isDarkmode;
    if (perferedTheme === "auto") {
        isDarkmode = (0, captchaHelpers_1.isDarkModePerefered)();
    }
    else {
        isDarkmode = perferedTheme === "dark";
    }
    const c1l = isDarkmode ? 255 : 0;
    const c2l = isDarkmode ? 245 : 35;
    const c3l = isDarkmode ? 235 : 45;
    const c4l = isDarkmode ? 225 : 55;
    const c1h = isDarkmode ? 140 : 115;
    const c2h = isDarkmode ? 30 : 225;
    const c3h = isDarkmode ? 130 : 125;
    const c4h = isDarkmode ? 205 : 50;
    const c5h = isDarkmode ? 35 : 220;
    const c6h = isDarkmode ? 145 : 110;
    const c7h = isDarkmode ? 45 : 210;
    const c8h = isDarkmode ? 185 : 70;
    const c9h = isDarkmode ? 135 : 120;
    /**
     *     const c1h = isDarkmode ? 255 : 115
    const c2h = isDarkmode ? 245 : 225
    const c3h = isDarkmode ? 235 : 125
    const c4h = isDarkmode ? 225 : 50
    const c5h = isDarkmode ? 215 : 220
    const c6h = isDarkmode ? 205 : 110
    const c7h = isDarkmode ? 195 : 210
    const c8h = isDarkmode ? 185 : 70
    const c9h = isDarkmode ? 175: 120

     */
    const ran1a = (0, captchaHelpers_1.randomNumber)(c1l, c1h);
    const ran1b = (0, captchaHelpers_1.randomNumber)(c1l, c2h);
    const ran1c = (0, captchaHelpers_1.randomNumber)(c1l, c3h);
    const ran2a = (0, captchaHelpers_1.randomNumber)(c1l, c4h);
    const ran2b = (0, captchaHelpers_1.randomNumber)(c1l, c5h);
    const ran2c = (0, captchaHelpers_1.randomNumber)(c1l, c6h);
    const ran3a = (0, captchaHelpers_1.randomNumber)(c2l, c7h);
    const ran3b = (0, captchaHelpers_1.randomNumber)(c3l, c8h);
    const ran3c = (0, captchaHelpers_1.randomNumber)(c4l, c9h);
    const textColors = [
        `rgb(${ran1a},${ran1b},${ran1c})`,
        `rgb(${ran2a},${ran2b},${ran2c})`,
        `rgb(${ran3a},${ran3b},${ran3c})`,
        `rgb(${ran1c},${ran2b},${ran3a})`
    ];
    const fonts = constants_1.canvasFonts;
    const letterSpace = 180 / captcha.length;
    for (let i = 0; i < captcha.length; i += 1) {
        const letterSize = (0, captchaHelpers_1.randomNumber)(35, 45);
        const xInitialSpace = letterSize * 1.25;
        ctx.font = `${letterSize}px ${fonts[(0, captchaHelpers_1.randomNumber)(0, 4)]}`;
        ctx.fillStyle = textColors[(0, captchaHelpers_1.randomNumber)(0, 4)];
        if ((0, captchaHelpers_1.randomNumber)(0, 1) === 0) {
            ctx.fillText(captcha[i], xInitialSpace + i * letterSpace, Math.floor((0, captchaHelpers_1.randomNumber)(0, 1) * letterSize + xInitialSpace), 50);
        }
        else {
            const ran = Math.floor((0, captchaHelpers_1.randomNumber)(0, 1) * letterSize + xInitialSpace);
            ctx.strokeText(captcha[i], xInitialSpace + i * letterSpace, ran, 50);
            ctx.fillText(captcha[i], xInitialSpace + i * letterSpace, ran, 50);
        }
        ctx.shadowColor = textColors[(0, captchaHelpers_1.randomNumber)(0, 3)];
        ctx.shadowBlur = (0, captchaHelpers_1.randomNumber)(0, xInitialSpace / 3);
        ctx.shadowOffsetX = (0, captchaHelpers_1.randomNumber)(-3, 3);
        ctx.shadowOffsetY = (0, captchaHelpers_1.randomNumber)(-5, 5);
        ctx.textRendering = "geometricPrecision";
        ctx.filter = `blur(${(0, captchaHelpers_1.randomNumber)(0, 5) * 0.1}px)`;
    }
};
exports.drawCaptchaOnCanvas = drawCaptchaOnCanvas;
