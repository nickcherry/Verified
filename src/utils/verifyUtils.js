const verificationClaimsRegex = /verified:0x[a-fA-F0-9]{40}/g;

export const getVerificationClaims = (text) => {
  return (text.match(verificationClaimsRegex) || []).map((match) => match.replace('verified:', ''));
};
