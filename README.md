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

First ensure that the Ethereum development network is running (`yarn serve-ethereum`), then to start the test suite:


```shell
yarn test
```


## :sparkles: Linting

To lint the project, run the following:

```shell
yarn lint
```