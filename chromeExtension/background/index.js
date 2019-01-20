/**************************************************************************/
/* Imports */
/**************************************************************************/

import Web3 from 'web3';
import { abi, networks } from '../../builds/contracts/Registry.json';
import { last } from 'lodash';

import registerHandlers from './registerHandlers';


/**************************************************************************/
/* Contract Setup */
/**************************************************************************/

let environment = { chrome };

if (typeof web3 !== 'undefined') {
  environment.web3Instance = new Web3(web3.currentProvider); // eslint-disable-line no-undef
} else {
  const httpProvider = new Web3.providers.HttpProvider(process.env.NETWORK_URL);
  environment.web3Instance = new Web3(httpProvider);
}

const contractAddress = last(Object.values(networks)).address;
environment.contract = new environment.web3Instance.eth.Contract(abi, contractAddress);

 
/**************************************************************************/
/* Initialization */
/**************************************************************************/

registerHandlers(environment);