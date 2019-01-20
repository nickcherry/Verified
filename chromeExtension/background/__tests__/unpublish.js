import unpublish from '../unpublish';

const { stub } = sinon;

describe('background', () => {
  describe('unpublish', () => {
    const address = '0x104bf7f95dedb0aebe014a7aaf8b7cd025a07f93';
    const callStub = stub().returns(Promise.resolve({ receipt: { from: address } }));
    const unpublishStub = stub().returns(callStub);
    const contract = { methods: { unpublish: unpublishStub } };

    it('should unpublish the given url', (done) => {
      const url = 'http://example.com/';
      unpublish(contract)({ url }, null, () => {
        expect(unpublishStub.getCall(0).args).to.deep.eq([url]);
        done();
      });
    });
  });
});