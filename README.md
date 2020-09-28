# gift-matic

Donate MATIC to users (who deposit tokens to Matic and also make mapped token transfers) !!

## setup

#### Installation

```sh
$ git clone https://github.com/rahuldamodar94/gift-matic
$ cd gift-matic
$ nvm use
$ npm install

```

## Configure environment

You need to configure your environment variables now. Copy `.env.example` and rename as `.env`(Rename as `config-production.env` in production environment). Now provide values for the keys mentioned there. Add the list of mapped addresses to config/addresses.json

#### Development

```sh
$ node scripts/detect-plasma-deposits
$ node scripts/detect-pos-deposits
$ node scripts/detect-transfers
```
