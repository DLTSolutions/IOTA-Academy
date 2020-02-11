//Tangle_Interaction_Characteristics: All default values used in other scripts
var core = require('@iota/core');
var node = core.composeAPI({
   provider: 'https://nodes.devnet.iota.org:443'
});

const TIC = {
   IotaCore: core,
   node: node,
   Converter: require('@iota/converter'),
   TransactionConverter: require('@iota/transaction-converter'),
   seed: 'BSWQKOJPJHPKDHSQW9WYPX9CG9NTOUUVMRTOUINQ9LNWNHGGBPAECYSJSXMOEFCABTOEKSCIOHRLNEHGD',
   outputAddress: 'XIJLQUOEQNQGMOTSJYWUYBPBWSGUEFBZNNUALMVVAKARPYRBROVPKJRDXC9KVVYGKTPKJZEURTAKDVVAAGF9CQEHWC', //send to this address
   depth: 3, //start the Random Walk, with which we look for two confirmation tips, 3 milestones deep in the tangle
   minWeightMagnitude: 9, //The difficulty of the PoW. This value is currently set to 14 in Mainnet and 9 in Devnet.
   tag: 'DLTSOLUTIONST', //Only uppercase and 9 allowed here!! (The Trytes alphabet)
};

module.exports = TIC;