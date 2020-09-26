# gift-matic

Donate MATIC to matic network users with low balance !!

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
