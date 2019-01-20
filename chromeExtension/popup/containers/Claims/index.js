/**************************************************************************/
/* Imports */
/**************************************************************************/

import React from 'react';

import ErrorWrapper from '../../components/ErrorWrapper';
import P from '../../components/P';
import Wrapper from './Wrapper';


/**************************************************************************/
/* Component */
/**************************************************************************/

export default ({ claims = [], error, url }) => {
  const renderedIntro = !error && claims.length > 0
    ? <P>The following {claims.length} content verifications were found on {url}:</P>
    : <P>No content verifications were found{url && ` at ${url}`}.</P>

  const renderedError = error && <ErrorWrapper>{error}</ErrorWrapper>;

  return (
    <Wrapper>
      {renderedIntro}
      {renderedError}
      {claims.map(({ address, innerContentHash }) => {
        <div key={address}>{innerContentHash}</div>
      })}
    </Wrapper>
  );
};