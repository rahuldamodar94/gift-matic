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
  secret: process.env.jwt_secret,
  port: process.env.PORT,
};
