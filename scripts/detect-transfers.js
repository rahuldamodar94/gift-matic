const config = require("../config/config");
const Dagger = require("@maticnetwork/dagger");
const dagger = new Dagger(config.DAGGER_URL);
const Web3 = require("web3");
let rpc = config.RPC_URL;
const provider = new Web3.providers.HttpProvider(rpc);
const web3 = new Web3(provider);

async function detectTransfers(childTokenAddress) {
  console.log("dagger started for" + childTokenAddress);
  let eventString =
    "latest:log/" +
    childTokenAddress +
    "/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/#";
  dagger.on(eventString, async (response) => {
    let userAddress = web3.eth.abi.decodeParameter(
      "address",
      response.topics[2]
    );
    let balance = await web3.eth.getBalance(userAddress);
    if (balance < config.MINIMUM_BALANCE) {
      web3.eth.accounts.wallet.add(config.PRIVATE_KEY);
      // Send 10 MATIC
      let sent = await web3.eth.sendTransaction({
        from: config.FROM_ADDRESS,
        to: userAddress,
        value: web3.utils.toWei(config.DONATION_AMOUNT, "ether"),
        gas: 8000000,
      });
      console.log(sent);
    }
  });
}

// Add the list of mapped child addresses to this file
let address_array = require("../config/addresses.json").addresses;
for (address of address_array) {
  detectTransfers(address).catch((err) => {
    console.log(err);
  });
}
