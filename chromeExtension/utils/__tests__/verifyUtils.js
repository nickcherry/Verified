import { getClaims } from '../verifyUtils';


describe('verifyUtils', () => {
  describe('getClaims', () => {
    const address1 = '0x52908400098527886E0F7030069857D2E4169EE7';
    const address2 = '0x52908400098527886E0F7030069857D2E4169EE8';

    it('should find single addresses multiple times and preserve inner whitespace', () => {
      const text1 = `Lorem ipsum verified-start:${address1} abc verified-end:${address1} dolor sit`;
      const claims1 = getClaims(text1);
      expect(claims1.length).to.eq(1);
      expect(claims1[0]).to.deep.eq({
        address: address1,
        innerContent: ' abc ',
        innerContentHash: '01c9a8945abead949b46c77cf3245b8a',
      });

      const text2 = `
        verified-start:${address2}
          xyz
        verified-end:${address2}
      `;
      const claims2 = getClaims(text2);
      expect(claims2.length).to.eq(1);
      expect(claims2[0]).to.deep.eq({
        address: address2,
        innerContent: '\n          xyz\n        ',
        innerContentHash: '3f55146e18658138ee5497eb414ffc25',
      });

    });

    it('should find multiple addresses', () => {
      const text = `
        Lorem ipsum verified-start:${address1} abc verified-end:${address1}
        dolor sit verified-start:${address2}xyzverified-end:${address2}
      `;

      const claims = getClaims(text);
      expect(claims.length).to.eq(2);
      expect(claims[0]).to.deep.eq({
        address: address1,
        innerContent: ' abc ',
        innerContentHash: '01c9a8945abead949b46c77cf3245b8a',
      });
      expect(claims[1]).to.deep.eq({
        address: address2,
        innerContent: 'xyz',
        innerContentHash: 'd16fb36f0911f878998c136191af705e',
      });
    });


    it('should gracefully handle malformed and non-existent matches', () => {
      const shortenedAddress1 = address1.slice(0, -1);
      expect(getClaims(`verified-start:${address1} abc`)).to.deep.eq([]);
      expect(getClaims(`verified-start: ${address1} abc verified-end:${address1}`)).to.deep.eq([]);
      expect(getClaims(`verified-start:${shortenedAddress1} abc verified-end:${shortenedAddress1}`)).to.deep.eq([]);
      expect(getClaims(`verified-start${address1} abc verified-end:${address1}`)).to.deep.eq([]);
      expect(getClaims(`verified-start:${address1}`)).to.deep.eq([]);
    });
  });
});