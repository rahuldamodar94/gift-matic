let path = require("path");
let dotenv = require("dotenv");

// load config env
let root = path.normalize(`${__dirname}/..`);
let fileName = "";

switch (process.env.NODE_ENV) {
  case "production": {
    fileName = "/config-production.env";
    break;
  }
  default:
    fileName = "/.env";
}

const configFile = `${root}${fileName}`;
dotenv.config({ path: configFile, silent: true });

module.exports = {
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  FROM_ADDRESS: process.env.FROM_ADDRESS,
  DONATION_AMOUNT: process.env.DONATION_AMOUNT,
  RPC_URL: process.env.RPC_URL,
  DAGGER_URL: process.env.DAGGER_URL,
  MINIMUM_BALANCE: process.env.MINIMUM_BALANCE,
  WEB_SOCKET_URL: process.env.WEB_SOCKET_URL,
  CHILD_CHAIN_MANAGER_PROXY: process.env.CHILD_CHAIN_MANAGER_PROXY,
  CHILD_CHAIN: process.env.CHILD_CHAIN,
};
