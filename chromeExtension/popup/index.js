/**************************************************************************/
/* Imports */
/**************************************************************************/

import React from 'react';
import { render } from 'react-dom';

import { GET_ACCOUNTS } from '../constants/messageTypes';

import { getClaims } from '../utils/verifyUtils';
import { normalizeUrl } from '../utils/urlUtils';

import App from './containers/App';


/**************************************************************************/
/* Initialization  */
/**************************************************************************/

render(<App chrome={chrome} />, document.getElementById('root'));