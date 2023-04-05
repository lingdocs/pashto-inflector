export function assertNever(x: never) {
    throw new Error("unexpected object: "+x);
    return x;
}