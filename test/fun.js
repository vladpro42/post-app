export function multiply(a, b) {
    return a * b;
}

export function add(a, b) {
    return a + b
}

export function multiplyAsync(a, b, cb) {
    setTimeout(() => {
        cb(a * b)
    }, 1000)
}