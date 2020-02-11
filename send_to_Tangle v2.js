const TIC = require('./Tangle_Interaction_Characteristics');
const message = TIC.Converter.asciiToTrytes('Hi IOTA4!');

//Next we define the transfer [array], which contains the data for the planned transactions:
const transfers = [
   {
       value: 0,
       address: TIC.outputAddress,
       tag: TIC.tag,
       message: message
   }
];

//Create the transaction https://github.com/iotaledger/wiki/blob/master/api-proposal.md#prepareTransfers
TIC.node.prepareTransfers(TIC.seed, transfers)
   .then(trytes => TIC.node.sendTrytes(trytes, TIC.depth, TIC.minWeightMagnitude))
   .then(bundle => {
       console.log(bundle);
   })
   .catch(err => {
       console.log(err);
   });
  