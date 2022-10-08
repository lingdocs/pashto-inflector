/**
 * Determines if a string is written in Pashto script;
 */

const pashtoLetters = /[\u0600-\u06FF]/;

export function isPashtoScript(s: string): boolean {
    return pashtoLetters.test(s);
}