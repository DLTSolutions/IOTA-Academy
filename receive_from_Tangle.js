//Import the required modules and functions and initialize the IOTA API object:
const Iota = require('@iota/core')
const Converter = require('@iota/converter')
const iota = Iota.composeAPI({
   provider: 'https://nodes.devnet.iota.org:443'
})

//Define some constants:
//The listenAddress is set to the address to which we sent our messages (outputAddress) in the previous code send_to_Tangle.js
const listenAddress = 'XIJLQUOEQNQGMOTSJYWUYBPBWSGUEFBZNNUALMVVAKARPYRBROVPKJRDXC9KVVYGKTPKJZEURTAKDVVAAGF9CQEHWC'
const tag = 'IOTACADEMY9TUTORIAL9MESSAGE';
const query = {
   addresses: [listenAddress],
   tags: [tag]
}
 
//The query object defines a filter with which we can filter the result according to certain search criteria when searching for transactions. In our case, we limit our search to transactions sent to a specific address with a specific tag. Next, we start the search:
iota.findTransactionObjects(query)
  .then(transactions => {
      transactions.map(transaction => {
           const msg = Converter.trytesToAscii(transaction.signatureMessageFragment.replace(/9*$/, ''));
           console.log(msg)
      })
  })
  .catch(err => {
      console.log(err)
  })
