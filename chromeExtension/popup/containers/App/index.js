/**************************************************************************/
/* Imports */
/**************************************************************************/

import React, { useState, useEffect } from 'react';

import { GET_ACCOUNTS } from '../../../constants/messageTypes';

import { getClaims } from '../../../utils/verifyUtils';

import Claims from '../Claims';
import Publish from '../Publish';
import Wrapper from './Wrapper';


/**************************************************************************/
/* Constants and Settings */
/**************************************************************************/

const defaultActiveTabDataError = 'The Chrome extension doesn\'t have access to the current page.';
const activeTabDataCode = 'result = { url: window.location.href, html: document.body.outerHTML }';


/**************************************************************************/
/* Hooks */
/**************************************************************************/

const getAccounts = ({ chrome, updateAccounts}) => {
  return () => {
    chrome.runtime.sendMessage({ type: GET_ACCOUNTS }, (accounts) => {
      updateAccounts(accounts);
    });
  };
};

const getActiveTabData = ({ chrome, updateActiveTabData, updateActiveTabDataError }) => {
  return () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];

      if (!tab || tab.url.indexOf('chrome:') === 0 || tab.url.indexOf('https://chrome.google.com') === 0) {
        return updateActiveTabDataError(defaultActiveTabDataError);
      }

      chrome.tabs.executeScript(tab.id, { code: activeTabDataCode }, (responses) => {
        if (responses && responses.length) {
          const [response] = responses;
          const claims = getClaims(response.html);
          updateActiveTabData(Object.assign(response, { claims }));
        } else {
          return updateActiveTabDataError(defaultActiveTabDataError);
        }
      });
    });
  };
};


/**************************************************************************/
/* Component */
/**************************************************************************/

export default ({ chrome }) => {
  const [accounts, updateAccounts] = useState();
  const [activeTabData, updateActiveTabData] = useState({});
  const [activeTabDataError, updateActiveTabDataError] = useState();

  useEffect(getAccounts({ chrome, updateAccounts}), []);
  useEffect(getActiveTabData({ chrome, updateActiveTabData, updateActiveTabDataError }), []);

  const { claims, html, url } = activeTabData;

  return (
    <Wrapper>
      <Claims claims={claims} error={activeTabDataError} url={url} />
      <Publish accounts={accounts} claims={claims} url={url} />
    </Wrapper>
  );
};