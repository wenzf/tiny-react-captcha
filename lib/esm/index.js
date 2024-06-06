import { jsx as _jsx } from "react/jsx-runtime";
import { Captcha } from "./Captcha";
const TinyReactCaptcha = (props) => {
    return (_jsx("div", { children: _jsx(Captcha, { ...props }) }));
};
export default TinyReactCaptcha;
