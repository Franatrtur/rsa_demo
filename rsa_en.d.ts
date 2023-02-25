export declare class RSAKey {
    private exponent;
    mod: number;
    constructor(exponent: number, mod: number);
    cipher(message: number): number;
}
export declare class RSAKeyPair {
    publicKey: RSAKey;
    privateKey: RSAKey;
    static generate(): RSAKeyPair;
    constructor(publicKey: RSAKey, privateKey: RSAKey);
}
