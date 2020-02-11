//import the required symbols and functions and create a reference to the IOTA API object
const Iota = require('@iota/core');
const Converter = require('@iota/converter');
const TransactionConverter = require('@iota/transaction-converter');

const iota = Iota.composeAPI({
   provider: 'https://nodes.devnet.iota.org:443'
});

const seed = 'BSWQKOJPJHPKDHSQW9WYPX9CG9NTOUUVMRTOUINQ9LNWNHGGBPAECYSJSXMOEFCABTOEKSCIOHRLNEHGD';
const outputAddress = 'XIJLQUOEQNQGMOTSJYWUYBPBWSGUEFBZNNUALMVVAKARPYRBROVPKJRDXC9KVVYGKTPKJZEURTAKDVVAAGF9CQEHWC'; //sne to this address

const depth = 3; //start the Random Walk, with which we look for two confirmation tips, 3 milestones deep in the tangle
const minWeightMagnitude = 9; //The difficulty of the PoW. This value is currently set to 14 in Mainnet and 9 in Devnet.

const tag = 'SECONDCHATATTEMPT';
var message ='';//declare message here as a variable instead of a const so it can get the value after the prompt question

//Functionality to handle the question on your screen This is the INITIALIZATION OF PROMPT
const prompt = (question) => {
    return new Promise((resolve, reject) => {
        const { stdin, stdout } = process;
        stdin.resume();
        stdout.write(question);
        stdin.on('data', data => resolve(data.toString().trim()));
        stdin.on('error', err => reject(err));
    });
 };

//This prompts a question on your screen
prompt("Enter a message: ")
   .then(input => {
       console.log(input);
       message = Converter.asciiToTrytes(input);
       
        //Define the transfer [array], which contains the data for the planned transactions, including the answer to our chat question:
        const transfers = [
            {
                value: 0,
                address: outputAddress,
                tag: tag,
                message: message
            }
        ];

        //Create the transaction to send the input of the user to TheTangle
        iota.prepareTransfers(seed, transfers)
            .then(trytes => iota.sendTrytes(trytes, depth, minWeightMagnitude))
            .catch(err => {
                console.log(err);
            });
        
        //Now let a listener retrieve the messages send to the address and prompt them on the screen
        //The query object defines a filter with which we can filter the result according to certain search criteria when searching for transactions. 
        //In our case, we limit our search to transactions sent to a specific address with a specific tag.
        const query = {
            addresses: [outputAddress],
            tags: [tag]
        };

        //Now we start the search for messages that comply to our query
        iota.findTransactionObjects(query)
        .then(transactions => {
            transactions.map(transaction => {
                const msg = Converter.trytesToAscii(transaction.signatureMessageFragment.replace(/9*$/, ''));
                console.log(msg);
            });
        })
        .catch(err => {
            console.log(err);
        });
    })
   .catch(err => {
       console.log(err);
       process.exit();
   });
 