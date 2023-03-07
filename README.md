Tento archiv obsahuje demonstrativní implementaci šifry RSA v programovacím jazyce javascript
pro ročníkovou práci "Asymetrická kryptografie a šifrovací systém RSA"
(Gymnázium Slovanské náměstí, Brno, 2023). Autor Franišek Čech, V.A

#### Použití:
Modul exportuje (ES6 modle system) třídu `RSAKey{mod: number, exponent: number}` a 
`RSAKeyPair{publicKey: RSAKey, privateKey: RSAKey}`.  
Jak začít modul používat:
```bash
$ npm install @franatrtur/rsa_demo
```
```javascript
import { RSAKey, RSAKeyPair } from "@franatrtur/rsa_demo"
```
Šifrování a dešifrování správ (čísla 1-1000) lze provádět pomocí funkce `(object RSAKey).process(message: number): number`.  
Vytvoření klíčového páru pze provést pomocí funkce `(class RSAKeyPair).generate()`.  
Funkce vybere exponent 7 a náhodná prvočísla z intervalu 2 do 256, ale je možné jí podat p, q, e jako parametry.
