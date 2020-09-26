const WebSocket = require("ws");
const _ = require("lodash");
const Web3 = require("web3");
const { config } = require("dotenv/types");
const ws = new WebSocket(config.WEB_SOCKET_URL);
const provider = new Web3.providers.HttpProvider(config.RPC_URL);
const web3 = new Web3(provider);

async function detectDeposits() {
  ws.on("open", function open() {
    ws.send(
      `{"id": 1, "method": "eth_subscribe", "params": ["newDeposits", {"Contract": ${config.CHILD_CHAIN}}]}`
    );
    ws.on("message", async function incoming(data) {
      var txData = _.get(JSON.parse(data), "params.result.Data", "");
      var userAddress = txData.substring(0, 64).replace(/^0+/, "0x");
      let balance = await web3.eth.getBalance(user);
      if (balance < config.MINIMUM_BALANCE) {
        web3.eth.accounts.wallet.add(config.PRIVATE_KEY);

        let tx = await web3.eth.sendTransaction({
          from: config.FROM_ADDRESS,
          to: userAddress,
          value: web3.utils.toWei(config.DONATION_AMOUNT, "ether"),
          gas: 1000000000,
        });
        console.log(tx);
      }
    });
  });
}

detectDeposits().catch((err) => {
  console.log(err);
});
