//import the required symbols and functions and create a reference to the IOTA API object
const Iota = require('@iota/core')
const Converter = require('@iota/converter')
const TransactionConverter = require('@iota/transaction-converter')
const iota = Iota.composeAPI({
   provider: 'https://nodes.devnet.iota.org:443'
})
const seed = 'BSWQKOJPJHPKDHSQW9WYPX9CG9NTOUUVMRTOUINQ9LNWNHGGBPAECYSJSXMOEFCABTOEKSCIOHRLNEHGD'
//outputAddress is the address to which we send our message or transaction
const outputAddress = 'XIJLQUOEQNQGMOTSJYWUYBPBWSGUEFBZNNUALMVVAKARPYRBROVPKJRDXC9KVVYGKTPKJZEURTAKDVVAAGF9CQEHWC'
//We define that we start the Random Walk, with which we look for two confirmation tips, 3 milestones deep in the tangle
const depth = 3
//minWeightMagnitude=9 defines the difficulty of the PoW. This value is currently set to 14 in Mainnet and 9 in Devnet.
const minWeightMagnitude = 9 
//This sets a tag and a message for our transaction. The asciiToTrytes function converts the message from ASCII to Trytes.
const tag = 'IOTACADEMY9TUTORIAL9MESSAGE'
const message = Converter.asciiToTrytes('Hello IOTA!')
//Next we define the transfer [array], which contains the data for the planned transactions:
const transfers = [
   {
       value: 0,
       address: outputAddress,
       tag: tag,
       message: message
   }
]
//Create the transaction
iota.prepareTransfers(seed, transfers)
   .then(trytes => trytes.map(hash => console.log(TransactionConverter.asTransactionObject(hash))))

   