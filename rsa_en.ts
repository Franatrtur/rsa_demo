
let PRIMES: Array<number> = [2] //small PRIMES (less than 2^8) - constant

//array initialization
outer: for(let n = 3; n < 256; n += 2){

	for(let factor = 1; factor < PRIMES.length; factor++)
		if(n % PRIMES[factor] === 0)
			continue outer

	PRIMES.push(n)
}

export const Primes = PRIMES.slice()

function random_prime(): number{

	// only select from the bigger half of primes
	return PRIMES[PRIMES.length / 2 + Math.floor(Math.random() * (PRIMES.length / 2))]
}

//code design from: https://www.geeksforgeeks.org/multiplicative-inverse-under-modulo-m/#tablist3-tab7
function modular_inversion(num: number, modulus: number): number{ //num != 1

	let mod0 = modulus
	let y = 0, x = 1
	let quot, temp
	
	while(num > 1){

		quot = Math.floor(num / modulus)
		temp = modulus

		//as euclids algorigm
		modulus = num % modulus
		num = temp
		temp = y

		y = x - quot * y
		x = temp
	}
	
	return x < 0 ? x + mod0 : x
}


function modular_power(base: number, exponent: number, modulus: number): number {

	let result = 1

	while(exponent){

		if((exponent & 1) == 1)
			result = (result * base) % modulus

		exponent >>= 1 //next bit
		base = (base ** 2) % modulus
	}

	return result
}


export class RSAKey {

	private exponent: number
	public mod: number

	constructor(exponent: number, mod: number){
		
		this.exponent = exponent
		this.mod = mod
	}

	process(message: number): number { //encrypt = decrypt

		return modular_power(message, this.exponent, this.mod)
	}

}


export class RSAKeyPair {

	public publicKey: RSAKey
	public privateKey: RSAKey

	static generate(prime1: number = 0, prime2: number = 0, exponent: number = 7){

		let e = exponent

		if(prime1 % e == 1 || prime2 % e == 1) //assert modular invertibility under phi(n)
			throw new Error("Exponent must be coprime with totient of n")

		do
			prime1 = random_prime()
		while(prime1 % e == 1)

		do
			prime2 = random_prime()
		while(prime2 % e == 1 || prime2 == prime1) // prevent factorization to n = p*p

		let p = prime1,
			q = prime2

		let n = p * q
		let totient = (p - 1) * (q - 1)
		let d = modular_inversion(e, totient)

		return new this(new RSAKey(e, n), new RSAKey(d, n))
	}

	constructor(publicKey: RSAKey, privateKey: RSAKey){

		this.publicKey = publicKey
		this.privateKey = privateKey
	}

}
