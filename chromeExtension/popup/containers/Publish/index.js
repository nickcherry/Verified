/**************************************************************************/
/* Imports */
/**************************************************************************/

import React from 'react';

import P from '../../components/P';
import Wrapper from './Wrapper';


/**************************************************************************/
/* Component */
/**************************************************************************/

export default ({ accounts, claims, url }) => {
  return (
    <Wrapper>
      <h1>Publish</h1>
      {accounts && accounts.join(', ')}
    </Wrapper>
  );
};