function average(a, b, c) {
    return (a + b + c) / 3;
}

function minimum(a, b, c) {
    return Math.min(a, b, c);
}

function factorial(n) {
    let f = 1;
    for (let i = 1; i <= n; i++) f *= i;
    return f;
}

function isPrime(n) {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function diffSquares(a, b) {
    return (a * a) - (b * b);
}

function evenOdd(n) {
    return n % 2 === 0 ? "Even" : "Odd";
}

module.exports = {
    average,
    minimum,
    factorial,
    isPrime,
    diffSquares,
    evenOdd
};





