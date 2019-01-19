const addressRegexSubstr = '0x[a-fA-F0-9]{40}';
const startTokenLength = 'verified-start:0x'.length + 40;

export const getClaims = (text) => {
  const claimsRegex = new RegExp(`verified\\-start:(${addressRegexSubstr})`, 'g');
  const claims = [];
  let match;
  while ((match = claimsRegex.exec(text)) !== null) {
    const { 1: address, index: startIndex } = match;
    const endIndex = text.indexOf(`verified-end:${address}`, startIndex);
    if (endIndex !== -1) {
      const innerContent = text.substring(startIndex + startTokenLength, endIndex);
      claims.push({ address, innerContent });
    }
  }
  return claims;
};