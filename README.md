# Verified

A decentralized contract and accompanying Chrome extension for verifying the (psuedo-)identity of content creators.


## :package: Installing Dependencies

After installing [Node](https://nodejs.org/en/) and [Yarn](https://github.com/yarnpkg/yarn), install NPM dependencies by running the following from the project's root:

```shell
yarn install
```


## :hammer: Developing


### Starting the Ethereum Development Server

To start the Ethereum development server (via [ganeche-cli](https://github.com/trufflesuite/ganache-cli), run the 
following:

```shell
yarn serve-ethereum
```


### Compiling Contracts

To compile Solidity smart contracts in [`./contracts`](./contracts), run the following:

```shell
yarn compile
```


### Migrating Contracts

To migrate compiled contracts to the development server, run the following:

```shell
yarn migrate
```


### Starting Webpack

To start Webpack and watch for changes associated with the Chrome extension, run the following:

```shell
yarn webpack-chrome-extension-development
```


## :muscle: Testing Contracts

First ensure that the Ethereum development network is running (`yarn serve-ethereum`) and that contracts are compiled and migrated (`yarn compile-and-migrate`), then start the full test suite by running:


```shell
yarn test
```

To test only the smart contracts, run:

```shell
yarn test-contracts
```

To test only the Chrome extension, run:

```shell
yarn test-chrome-extension

```


## :sparkles: Linting

To lint the project, run the following:

```shell
yarn lint
```