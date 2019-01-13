# Verified


## :package: Installing Dependencies

After installing [Node](https://nodejs.org/en/) and [Yarn](https://github.com/yarnpkg/yarn), install NPM dependencies by running the following from the project's root:

```shell
yarn install
```


## :art: Developing

To start the Ethereum development server (using [ganeche-cli](https://github.com/trufflesuite/ganache-cli) and have Webpack watch for changes associated with the Chrome extension, run the following:

```shell
yarn develop
```

To only start the Ethereum development server, run:

```shell
yarn serve-ethereum
```


To only start Webpack and watch for changes associated to the Chrome extension, run:

```shell
yarn webpack-chrome-extension-development
```


## :hammer: Compilng Contracts

To compile Solidity smart contracts in [`./contracts`](./contracts), run the following:

```shell
yarn compile
```


## :rocket: Migrating Contracts

To migrate compiled contracts to the development server, run the following:

```shell
yarn migrate
```

To migrate compiled contracts to the live Etheruem network, run the following:

```shell
yarn migrate-production
```


## :muscle: Testing Contracts

First ensure that the Ethereum development network is running (either by `yarn develop` or `yarn serve-ethereum`) , then to start the test suite:


```shell
yarn test
```


## :sparkles: Linting

To lint the project, run the following:

```shell
yarn lint
```