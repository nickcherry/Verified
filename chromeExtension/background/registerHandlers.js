/**************************************************************************/
/* Imports */
/**************************************************************************/

import { GET_ACCOUNTS, PUBLISH, UNPUBLISH, VERIFY } from '../constants/messageTypes';

import publish from './publish';
import unpublish from './unpublish';
import verify from './verify';


/**************************************************************************/
/* Export */
/**************************************************************************/

export default ({ chrome, contract, web3Instance }) => {
  const getAccounts = (_request, _sender, sendResponse) => {
    web3Instance.eth.getAccounts().then(sendResponse);
  };

  const handlers = {
    [GET_ACCOUNTS]: getAccounts,
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
};
