/*
 * Tento soubor obsahuje demonstrativní implementaci šifry RSA v programovacím jazyce javascript
 * pro ročníkovou práci "Asymetrická kryptografie a šifrovací systém RSA"
 * (Gymnázium Slovanské náměstí, Brno, 2023). Autor Franišek Čech, V.A
 */
let PRIMES = [2]; //small PRIMES (less than 2^8) - constant
//array initialization
outer: for (let n = 3; n < 256; n += 2) {
    for (let factor = 1; factor < PRIMES.length; factor++)
        if (n % PRIMES[factor] === 0)
            continue outer;
    PRIMES.push(n);
}
function random_prime() {
    return PRIMES[Math.floor(Math.random() * PRIMES.length)];
}
//code design from: https://www.geeksforgeeks.org/multiplicative-inverse-under-modulo-m/#tablist3-tab7
function modular_inversion(num, modulus) {
    let mod0 = modulus;
    let y = 0, x = 1;
    let quot, temp;
    while (num > 1) {
        quot = Math.floor(num / modulus);
        temp = modulus;
        //as euclids algorigm
        modulus = num % modulus;
        num = temp;
        temp = y;
        y = x - quot * y;
        x = temp;
    }
    return x < 0 ? x + mod0 : x;
}
function modular_power(base, exponent, modulus) {
    let result = 1;
    while (exponent) {
        if ((exponent & 1) == 1)
            result = (result * base) % modulus;
        exponent >>= 1;
        base = (Math.pow(base, 2)) % modulus;
    }
    return result;
}
class RSAKey {
    constructor(exponent, mod) {
        this.exponent = exponent;
        this.mod = mod;
    }
    šifrovat(message) {
        return modular_power(message, this.exponent, this.mod);
    }
}
class RSAKeyPair {
    constructor(publicKey, privateKey) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }
    static generate() {
        let e = 65;
        let p = random_prime(), q = random_prime();
        let n = p * q;
        let totient = (p - 1) * (q - 1);
        let d = modular_inversion(e, totient);
        return new this(new RSAKey(e, n), new RSAKey(d, n));
    }
}
