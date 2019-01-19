/**************************************************************************/
/* Imports */
/**************************************************************************/

import Web3 from 'web3';
import { abi, networks } from '../../builds/contracts/Registry.json';
import { last } from 'lodash';

import publish from './publish';
import unpublish from './unpublish';
import verify from './verify';

import { PUBLISH, UNPUBLISH, VERIFY } from '../constants/messageTypes';


/**************************************************************************/
/* Contract Setup */
/**************************************************************************/

let web3Instance;

if (typeof web3 !== 'undefined') {
  web3Instance = new Web3(web3.currentProvider); // eslint-disable-line no-undef
} else {
  const httpProvider = new Web3.providers.HttpProvider(process.env.NETWORK_URL);
  web3Instance = new Web3(httpProvider);
}

const contractAddress = last(Object.values(networks)).address;
const contract = new web3Instance.eth.Contract(abi, contractAddress);

 
/**************************************************************************/
/* Message Handlers */
/**************************************************************************/

const handlers = {
  [PUBLISH]: publish(contract),
  [UNPUBLISH]: unpublish(contract),
  [VERIFY]: verify(contract),
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const handler = handlers[request.type];
  if (handler) {
    handler(request, sender, sendResponse);
    return true; // We need to return true here to tell Chrome the response will be async.
  }
});