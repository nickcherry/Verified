import verify from '../verify';

const { stub } = sinon;

describe('background', () => {
  describe('verify', () => {
    const callStub = stub().returns(Promise.resolve(true));
    const verifyStub = stub().returns(callStub);
    const contract = { methods: { verify: verifyStub } };

    it('should verify the given url', (done) => {
      const address = '0x52908400098527886E0F7030069857D2E4169EE7';
      const url = 'http://example.com/';
      verify(contract)({ address, url }, null, (result) => {
        expect(result).to.eq(true);
        expect(verifyStub.getCall(0).args).to.deep.eq([address, url]);
        done();
      });
    });
  });
});