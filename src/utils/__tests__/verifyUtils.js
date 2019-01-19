import { getVerificationClaims } from '../verifyUtils';

describe('verifyUtils', () => {
  describe('getVerificationClaims', () => {
    it('should find a single address', () => {
      const address = '0x52908400098527886E0F7030069857D2E4169EE7';
      const text = `Some Text verified:${address} Some More Text`;
      expect(getVerificationClaims(text)).to.deep.eq([address]);
    });

    it('should find multiple addresses', () => {
      const address1 = '0x52908400098527886E0F7030069857D2E4169EE7';
      const address2 = '0x52908400098527886E0F7030069857D2E4169EE8';
      
      const text = `Some Text verified:${address1} Some More Text verified:${address2}`;
      expect(getVerificationClaims(text)).to.deep.eq([address1, address2]);
    });

    it('should gracefully handle no matches', () => {
      expect(getVerificationClaims('verified: 0x52908400098527886E0F7030069857D2E4169EE7')).to.deep.eq([]);
      expect(getVerificationClaims('verified:0x52908400098527886E0F7030069857D2E4169EEx')).to.deep.eq([]);
      expect(getVerificationClaims('verified0x52908400098527886E0F7030069857D2E4169EE7')).to.deep.eq([]);
      expect(getVerificationClaims('verified:')).to.deep.eq([]);
    });
  });
});