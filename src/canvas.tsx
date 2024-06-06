// import { CanvasHTMLAttributes } from "react";
import { isDarkModePerefered, randomNumber } from "./captchaHelpers";
import { PreferedTheme } from "./types";
import { canvasFonts } from "./constants";



export const drawCaptchaOnCanvas = (ctx: CanvasRenderingContext2D, captcha: string, perferedTheme: PreferedTheme) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    let isDarkmode: boolean;

    if (perferedTheme === "auto") {
        isDarkmode = isDarkModePerefered()
    } else {
        isDarkmode = perferedTheme === "dark"
    }

    const c1l = isDarkmode ? 255 : 0
    const c2l = isDarkmode ? 245 : 35
    const c3l = isDarkmode ? 235 : 45
    const c4l = isDarkmode ? 225 : 55

    const c1h = isDarkmode ? 140 : 115
    const c2h = isDarkmode ? 30 : 225
    const c3h = isDarkmode ? 130 : 125
    const c4h = isDarkmode ? 205 : 50
    const c5h = isDarkmode ? 35 : 220
    const c6h = isDarkmode ? 145 : 110
    const c7h = isDarkmode ? 45 : 210
    const c8h = isDarkmode ? 185 : 70
    const c9h = isDarkmode ? 135 : 120


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

    const ran1a = randomNumber(c1l, c1h)
    const ran1b = randomNumber(c1l, c2h)
    const ran1c = randomNumber(c1l, c3h)
    const ran2a = randomNumber(c1l, c4h)
    const ran2b = randomNumber(c1l, c5h)
    const ran2c = randomNumber(c1l, c6h)
    const ran3a = randomNumber(c2l, c7h)
    const ran3b = randomNumber(c3l, c8h)
    const ran3c = randomNumber(c4l, c9h)

    const textColors = [
        `rgb(${ran1a},${ran1b},${ran1c})`,
        `rgb(${ran2a},${ran2b},${ran2c})`,
        `rgb(${ran3a},${ran3b},${ran3c})`,
        `rgb(${ran1c},${ran2b},${ran3a})`
    ];

    const fonts = canvasFonts

    const letterSpace = 180 / captcha.length;
    for (let i = 0; i < captcha.length; i += 1) {
        const letterSize = randomNumber(35, 45)
        const xInitialSpace = letterSize * 1.25;
        ctx.font = `${letterSize}px ${fonts[randomNumber(0, 4)]}`;
        ctx.fillStyle = textColors[randomNumber(0, 4)];

        if (randomNumber(0, 1) === 0) {
            ctx.fillText(
                captcha[i],
                xInitialSpace + i * letterSpace,
                Math.floor(randomNumber(0, 1) * letterSize + xInitialSpace),
                50
            );
        } else {
            const ran = Math.floor(randomNumber(0, 1) * letterSize + xInitialSpace)
            ctx.strokeText(
                captcha[i],
                xInitialSpace + i * letterSpace,
                ran,
                50
            );
            ctx.fillText(
                captcha[i],
                xInitialSpace + i * letterSpace,
                ran,
                50
            );

        }

        ctx.shadowColor = textColors[randomNumber(0, 3)]
        ctx.shadowBlur = randomNumber(0, xInitialSpace / 3);

        ctx.shadowOffsetX = randomNumber(-3, 3)
        ctx.shadowOffsetY = randomNumber(-5, 5);
        (ctx as any).textRendering = "geometricPrecision"
        ctx.filter = `blur(${randomNumber(0, 5) * 0.1}px)`
    }


};