const TIC = require('./Tangle_Interaction_Characteristics');
const node = TIC.IotaCore.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443',
});

node.getNodeInfo()
    .then(info => console.log(info))
    .catch(error => {
        console.log(`Request error: ${error.message}`);
    });

    //console.log(TIC.IotaCore);
    console.log(node);
