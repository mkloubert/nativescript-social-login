/**
 * Deep object merging
 */
export function merge(to: Object, from: Object) {
    const copy = Object.assign({}, to);
    for (const n in from) {
        if (Array.isArray(to[n])) {
            copy[n] = copy[n].concat(from[n].filter(el => copy[n].indexOf(el) === -1));
        } else if (typeof to[n] !== "object") {
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
