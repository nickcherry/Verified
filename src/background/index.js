/**************************************************************************/
/* Imports */
/**************************************************************************/

import Web3 from 'web3';
import { abi, networks } from '../../builds/contracts/Registry.json';
import { last } from 'lodash';


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

const registryAddress = last(Object.values(networks)).address;
const registryContract = new web3Instance.eth.Contract(abi, registryAddress);

 
/**************************************************************************/
/* Message Handlers */
/**************************************************************************/

web3Instance.eth.getAccounts((err, accounts) => {
  const [account] = accounts;
  const callOpts = { from: account };

  const publish = ({ url }, _sender, sendResponse) => {
    registryContract.methods.publish(url).call(callOpts).then((response) => {
      sendResponse(response);
    });
  };

  const handlers = {
    publish,
  };

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const handler = handlers[request.type];
    if (handler) {
      handler(request, sender, sendResponse);
      return true; // We need to return true here to tell Chrome the response will be async.
    }
  });
});
