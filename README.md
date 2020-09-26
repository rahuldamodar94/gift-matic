# gift-matic

This repository contains api to retrieve marketplace data for matic network marketplace

## setup

#### Installation

```sh
$ cd gift-matic
$ nvm use
$ npm install

```

## Configure environment

You need to configure your environment variables now. Copy `.env.example` and rename as `.env`. Now provide values for the keys mentioned there.

#### Development

```sh
# apply migrations
$ node scripts/detect-plasma-deposits
$ node scripts/detect-pos-deposits
$ node scripts/detect-transfers
```
