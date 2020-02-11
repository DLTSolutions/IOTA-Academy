const TIC = require('./Tangle_Interaction_Characteristics');
const query = {
   addresses: [TIC.outputAddress],
   tags: [TIC.tag]
};
 
//The query object defines a filter with which we can filter the result according to certain search criteria when searching for transactions. In our case, we limit our search to transactions sent to a specific address with a specific tag. Next, we start the search:
TIC.node.findTransactionObjects(query)
  .then(transactions => {
      transactions.map(transaction => {
           const msg = TIC.Converter.trytesToAscii(transaction.signatureMessageFragment.replace(/9*$/, ''));
           console.log(msg);
      });
  })
  .catch(err => {
      console.log(err);
  });
