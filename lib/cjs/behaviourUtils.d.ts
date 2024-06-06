import { MutableRefObject, SyntheticEvent } from "react";
import { BehaviourEvents, BehaviourItems, ClientInfo } from "./types";
export declare const checkBehaviour: (behaviour: MutableRefObject<BehaviourItems>) => boolean;
export declare const onUserInputCB: (type: BehaviourEvents, e: SyntheticEvent, behaviour: MutableRefObject<BehaviourItems>, clientInfo: MutableRefObject<ClientInfo>) => void;
export declare function isLine(points: number[][]): boolean;
export declare const isStrangeDimension: (screenXorY: number[]) => boolean;
