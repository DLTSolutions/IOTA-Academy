console.log(__filename); //import the required symbols and functions and create a reference to the IOTA API object
const TIC = require('./Tangle_Interaction_Characteristics');
var message ='';//declare message here as a variable instead of a const so it can get the value after the prompt question

// @returns {Boolean} True if succesfull sent.
async function ask_user_for_input_and_publish() {
    const result = new Promise((resolve, reject) => {
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
                message = TIC.Converter.asciiToTrytes(input);
                
                    //Define the transfer [array], which contains the data for the planned transactions, including the answer to our chat question:
                    const transfers = [
                        {
                            value: 0,
                            address: TIC.outputAddress,
                            tag: TIC.tag,
                            message: message
                        }
                    ];

                    //Create the transaction to send the input of the user to TheTangle
                    TIC.node.prepareTransfers(seed, transfers)
                        .then(trytes =>  {
                            TIC.node.sendTrytes(trytes, TIC.depth, TIC.minWeightMagnitude);
                            resolve(true);
                        })
                        .catch(err => {
                            console.log(err);
                            reject(false);
                        });
            });
    });
}

//  @returns {Boolean} True if succesfull fetched.
async function receive_query_from_tangle() {
    const result = new Promise((resolve, reject) => {
        const query = {
            addresses: [TIC.outputAddress],
            tags: [TIC.tag]
        };
        //Search and retrieve messages send to the address with assigned tag (see query) and prompt them on the screen
        TIC.node.findTransactionObjects(query)
            .then(transactions => {
                transactions.map(transaction => {
                    const msg = TIC.Converter.trytesToAscii(transaction.signatureMessageFragment.replace(/9*$/, ''));
                    console.log(msg);
                });
                resolve(true);
            })
            .catch(err => {
                console.log(err);
                reject(false);
            });
    }); 
}

async function loop() {
    const sending = await ask_user_for_input_and_publish();
    //sending ? console.log("Succes") : console.log("Failed");
    const receiving = await  receive_query_from_tangle();
    //receiving ? console.log("Succes") : console.log("Failed");
}

for(var i = 0; i < 5; i++) {
    loop();
   }