const config = require("../config/config");
const WebSocket = require("ws");
const _ = require("lodash");
const Web3 = require("web3");
const ws = new WebSocket(config.WEB_SOCKET_URL);
const provider = new Web3.providers.HttpProvider(config.RPC_URL);
const web3 = new Web3(provider);
const abiCoder = web3.eth.abi;

async function checkDepositStatus() {
  ws.on("open", function open() {
    ws.send(
      `{"id": 1, "method": "eth_subscribe", "params": ["newDeposits", {"Contract": "${config.CHILD_CHAIN_MANAGER_PROXY}"}]}`
    );
    ws.on("message", async (msg) => {
      const parsedMsg = JSON.parse(msg);

      console.log(parsedMsg);
      if (
        parsedMsg &&
        parsedMsg.params &&
        parsedMsg.params.result &&
        parsedMsg.params.result.Data
      ) {
        const fullData = parsedMsg.params.result.Data;
        const { 0: syncType, 1: syncData } = abiCoder.decodeParameters(
          ["bytes32", "bytes"],
          fullData
        );
        // check if sync is of deposit type (keccak256("DEPOSIT"))
        const depositType =
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
        if (syncType.toLowerCase() === depositType.toLowerCase()) {
          const { 0: userAddress } = abiCoder.decodeParameters(
            ["address", "address", "bytes"],
            syncData
          );

          let balance = await web3.eth.getBalance(userAddress);
          if (balance < config.MINIMUM_BALANCE) {
            web3.eth.accounts.wallet.add(config.PRIVATE_KEY);
            let tx = await web3.eth.sendTransaction({
              from: config.FROM_ADDRESS,
              to: userAddress,
              value: web3.utils.toWei(config.DONATION_AMOUNT, "ether"),
              gas: 8000000,
            });
            console.log(tx);
          }
        }
      }
    });
  });
}

checkDepositStatus().catch((err) => {
  console.log(err);
});
