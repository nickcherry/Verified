import publish from '../publish';

const { stub } = sinon;

describe('background', () => {
  describe('publish', () => {
    const address = '0x104bf7f95dedb0aebe014a7aaf8b7cd025a07f93';
    const callStub = stub().returns(Promise.resolve({ receipt: { from: address } }));
    const publishStub = stub().returns(callStub);
    const contract = { methods: { publish: publishStub } };

    it('should publish the given url', (done) => {
      const url = 'http://example.com/';
      publish(contract)({ url }, null, () => {
        expect(publishStub.getCall(0).args).to.deep.eq([url]);
        done();
      });
    });
  });
});