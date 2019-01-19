import { getClaims } from '../verifyUtils';

describe('verifyUtils', () => {
  describe('getClaims', () => {
    it('should find a single address', () => {
      const address = '0x52908400098527886E0F7030069857D2E4169EE7';
      const text = `Lorem ipsum verified-start:${address} abc verified-end:${address} dolor sit`;
      const claims = getClaims(text);
      expect(claims.length).to.eq(1);
      expect(claims[0]).to.deep.eq({ address, innerContent: ' abc ' });
    });

    it('should find multiple addresses', () => {
      const address1 = '0x52908400098527886E0F7030069857D2E4169EE7';
      const address2 = '0x52908400098527886E0F7030069857D2E4169EE8';
      
      const text = `
        Lorem ipsum verified-start:${address1} abc verified-end:${address1}
        dolor sit verified-start:${address2}xyzverified-end:${address2}
      `;

      const claims = getClaims(text);
      expect(claims.length).to.eq(2);
      expect(claims[0]).to.deep.eq({ address: address1, innerContent: ' abc ' });
      expect(claims[1]).to.deep.eq({ address: address2, innerContent: 'xyz' });
    });


    it('should gracefully handle malformed and non-existent matches', () => {
      const address = '0x52908400098527886E0F7030069857D2E4169EE7';
      const shortedAddress = address.slice(0, -1);
      expect(getClaims(`verified-start:${address} abc`)).to.deep.eq([]);
      expect(getClaims(`verified-start: ${address} abc verified-end:${address}`)).to.deep.eq([]);
      expect(getClaims(`verified-start:${shortedAddress} abc verified-end:${shortedAddress}`)).to.deep.eq([]);
      expect(getClaims(`verified-start${address} abc verified-end:${address}`)).to.deep.eq([]);
      expect(getClaims(`verified-start:${address}`)).to.deep.eq([]);
    });
  });
});