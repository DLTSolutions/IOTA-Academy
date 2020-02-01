//import the iota.js core module 
const Iota = require('@iota/core')

//define some constants
//With security=2 we select security level 2, i.e. we need two transactions for the signature in a value transaction. 
//Finally, we specify with checksum=true that we want to generate addresses with checksums.
const seed = 'BSWQKOJPJHPKDHSQW9WYPX9CG9NTOUUVMRTOUINQ9LNWNHGGBPAECYSJSXMOEFCABTOEKSCIOHRLNEHGD'
const security = 2
const checksum = true

//create the addresses. A connection to a full node is not necessary.
//The "generateAddress" method generates an address deterministically from a seed.  
//With the variable "i" we specify the index of the address
for (let i=0; i<10; i++) {
    console.log("Address ", i, " :", Iota.generateAddress(seed, i, security, checksum))
}
