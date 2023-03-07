import { RSAKeyPair } from "./rsa_en.js"

function testRsa(msg, keypair){
	let encr = keypair.publicKey.process(msg)
	let decr = keypair.privateKey.process(encr)
	if(decr != msg)
		throw {keypair, msg}
}



for(let msg = 1; msg < 100; msg++){

	let kp = RSAKeyPair.generate()
	testRsa(msg, kp)
	testRsa(1 + Math.floor(Math.random()*1000), kp)
	testRsa(msg, RSAKeyPair.generate(0, 0, [3, 5, 11, 17, 23, 29][Math.floor(Math.random() * 6)]))
}

console.log("All tests passed")

console.log(RSAKeyPair.generate(257, 89, 7))