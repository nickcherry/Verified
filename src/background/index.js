/**************************************************************************/
/* Imports */
/**************************************************************************/

import web3 from 'web3';
import {
  abi as registryAbi,
  networks as registryNetworks,
} from '../../builds/contracts/Registry.json';


/**************************************************************************/
/* Contract Setup */
/**************************************************************************/

const httpProvider = new web3.providers.HttpProvider(process.env.NETWORK_URL);
const web3Instance = new web3(httpProvider);
const registryAddress = Object.values(registryNetworks)[0].address;
const registryContract = new web3Instance.eth.Contract(registryAbi, registryAddress);


/**************************************************************************/
/* Message Handlers */
/**************************************************************************/

const commit = ({ url }, _sender, sendResponse) => {
  registryContract.methods.publish(url).call().then((response) => {
    console.log(response);
    sendResponse(response);
  });
};

const handlers = {
  commit,
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const handler = handlers[request.type];

  if (handler) {
    handler(request, sender, sendResponse);
    return true; // We need to return true here to tell Chrome the response will be async.
  }
});