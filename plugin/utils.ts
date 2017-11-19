/**
 * Deep object merging
 */
export function merge(to: Object, from: Object) {
    const copy = Object.assign({}, to);
    for (const n in from) {
        if (typeof to[n] !== "object") {
            copy[n] = from[n];
        } else if (typeof from[n] === "object") {
            copy[n] = merge(copy[n], from[n]);
        }
    }
    return copy;
}

/* class decorator */
export function StaticImplements<T>() {
    return (constructor: T) => { };
}
