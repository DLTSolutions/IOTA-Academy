//Import the iota.js core module:
const Iota = require('@iota/core');

//Create a reference to the IOTA API object:
const iota = Iota.composeAPI({
   provider: "https://nodes.devnet.iota.org:443"
});

//As provider we enter here the address and port of a full node with public API.
//Now query for information about the node:
 
iota.getNodeInfo()
   .then(info => console.log(info))
   .catch(err => console.log(err));

