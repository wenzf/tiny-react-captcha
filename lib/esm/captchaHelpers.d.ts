import { CaptchaStringType } from "./types";
export declare function randomNumber(minInp: number, maxInp: number): number;
export declare function randomString(length: number, charCollection: string): string;
export declare function getCharCollection(collectionStringType?: CaptchaStringType, captchaCharsCollection?: string): string;
export declare const isDarkModePerefered: () => boolean;
