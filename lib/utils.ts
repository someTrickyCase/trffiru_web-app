import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

let lastKey = 0;
export function getRanKey() {
    lastKey += 1;
    return lastKey;
}

export function sliceHalfString(string: string) {
    const arr = string.split("");
    return arr.slice(0, arr.length / 2).join("");
}
