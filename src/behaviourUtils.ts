import { MutableRefObject, SyntheticEvent } from "react";
import { BehaviourEvents, BehaviourItems, ClientInfo } from "./types";
import { USER_INPUT_EVENTS } from "./constants";


export const checkBehaviour = (behaviour: MutableRefObject<BehaviourItems>): boolean => {

    if (!behaviour?.current) return false

    let isMouseOk = false;
    let isToucheOk = false;
    let isKeyboardOk = false;

    if (behaviour.current.mouse.mouseMove !== 0) {
        const upDownDiff = behaviour.current.mouse.down - behaviour.current.mouse.up
        if (Math.abs(upDownDiff) < 3) isMouseOk = true
    }

    if (behaviour.current.touch.up !== 0 && behaviour.current.touch.down !== 0) {
        const upDownDiff = behaviour.current.touch.down - behaviour.current.touch.up
        if (Math.abs(upDownDiff) < 3) isToucheOk = true
    }

    if (behaviour.current.keyboard.up !== 0 && behaviour.current.keyboard.down !== 0) {
        const upDownDiff = behaviour.current.keyboard.down - behaviour.current.keyboard.up
        if (Math.abs(upDownDiff) < 3) isKeyboardOk = true
    }

    if (!isMouseOk && !isToucheOk && behaviour.current.keyboard.numbTab === 0) return false
    if (behaviour.current.mouse.isNotTrusted !== 0 || behaviour.current.touch.isNotTrusted !== 0 || behaviour.current.keyboard.isNotTrusted !== 0) return false


    if (isMouseOk || isToucheOk || isKeyboardOk) return true;
    return false
}


export const onUserInputCB = (
    type: BehaviourEvents,
    e: SyntheticEvent,
    behaviour: MutableRefObject<BehaviourItems>,
    clientInfo: MutableRefObject<ClientInfo>
) => {
    // @ts-expect-error asdf
    const clientScreen = e.view.screen as Screen;

    clientInfo.current.screenAvailHeight.push(clientScreen.availHeight)
    clientInfo.current.screenAvailWidth.push(clientScreen.availWidth)

    // @ts-expect-error asdf
    clientInfo.current.movements.push([e.clientX ?? e.pageX, e.clientY ?? e.pageY])

    switch (type) {
        case USER_INPUT_EVENTS.TOUCH_START:
            behaviour.current.touch.down += 1
            if (e.isTrusted) {
                behaviour.current.touch.isTrusted += 1
            } else {
                behaviour.current.touch.isNotTrusted += 1
            }
            break
        case USER_INPUT_EVENTS.TOUCH_END:
            behaviour.current.touch.up += 1
            if (e.isTrusted) {
                behaviour.current.touch.isTrusted += 1
            } else {
                behaviour.current.touch.isNotTrusted += 1
            }
            break


        case USER_INPUT_EVENTS.MOUSE_DOWN:
            behaviour.current.mouse.down += 1
            if (e.isTrusted) {
                behaviour.current.mouse.isTrusted += 1
            } else {
                behaviour.current.mouse.isNotTrusted += 1
            }
            break
        case USER_INPUT_EVENTS.MOUSE_UP:
            behaviour.current.mouse.up += 1
            if (e.isTrusted) {
                behaviour.current.mouse.isTrusted += 1
            } else {
                behaviour.current.mouse.isNotTrusted += 1
            }
            break
        case USER_INPUT_EVENTS.MOUSE_MOVE:

            if (behaviour.current.mouse.mouseMove !== undefined) behaviour.current.mouse.mouseMove += 1
            if (e.isTrusted) {
                behaviour.current.mouse.isTrusted += 1
            } else {
                behaviour.current.mouse.isNotTrusted += 1
            }
            break



        case USER_INPUT_EVENTS.KEY_DOWN:
            behaviour.current.keyboard.down += 1

            // @ts-expect-error asdf
            if (e.key === 'Tab') {
                if (behaviour.current.keyboard.numbTab !== undefined) behaviour.current.keyboard.numbTab += 1
            }

            if (e.isTrusted) {
                behaviour.current.keyboard.isTrusted += 1
            } else {
                behaviour.current.keyboard.isNotTrusted += 1
            }
            break
        case USER_INPUT_EVENTS.KEY_UP:
            // @ts-expect-error asdf
            if (e.key === 'Tab') {
                if (behaviour.current.keyboard.numbTab !== undefined) behaviour.current.keyboard.numbTab += 1
            }
            behaviour.current.keyboard.up += 1;
            if (e.isTrusted) {
                behaviour.current.keyboard.isTrusted += 1
            } else {
                behaviour.current.keyboard.isNotTrusted += 1
            }
            break
    }

}

export function isLine(points: number[][]): boolean {
    if (points.length < 2) {
        return false;
    }

    let slope: number | undefined;
    let yIntercept: number | undefined;

    for (let i = 0; i < points.length - 1; i += 1) {
        const [x1, y1] = points[i];
        const [x2, y2] = points[i + 1];

        if (x1 !== undefined && y1 !== undefined && x2 !== undefined && y2 !== undefined) {
            slope = (y2 - y1) / (x2 - x1);
            yIntercept = y1 - (slope * x1);
            break;
        }
    }

    if (slope === undefined || yIntercept === undefined) {
        return false;
    }



    // @ts-expect-error asd
    return points.every(([x, y]) => {

        if (x === undefined) {
            return true;
        }

        if (slope && yIntercept) {
            const slopleByX = slope * x;

            if (slopleByX !== undefined) return y === slopleByX + yIntercept;
        }


    });
}


export const isStrangeDimension = (screenXorY: number[]): boolean => {
    let initialValue = 0;
    for (let i = 0; i < screenXorY.length; i += 1) {
        if (initialValue === 0) {
            if (screenXorY[i] > 200 && screenXorY[i] < 8000) {
                initialValue = screenXorY[i]
            } else {
                return true;
            }
        } else {
            if (initialValue !== screenXorY[i]) return true
        }
    }

    return false
}