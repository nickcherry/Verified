import { normalizeUrl } from '../urlUtils';

describe('urlUtils', () => {
  describe('normalizeUrl', () => {
    it('should return a normalized url', () => {
      expect(normalizeUrl('http://www.google.com')).to.eq('http://www.google.com/');
    });

    it('should append http:// when given a url that starts with www', () => {
      expect(normalizeUrl('www.google.com')).to.eq('http://www.google.com/');
    });

    it('should return undefined when given an invalid url', () => {
      expect(normalizeUrl('google')).to.eq(undefined);
      expect(normalizeUrl('.com')).to.eq(undefined);
    });
  });
});