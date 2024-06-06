import { CaptchaProps } from "./types";
import {Captcha} from "./Captcha";


const TinyReactCaptcha = (props: CaptchaProps) => {
    return (
        <div>
            <Captcha {...props} />
        </div>

    );
}

export default TinyReactCaptcha