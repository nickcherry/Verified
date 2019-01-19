import unpublish from '../unpublish';

const { stub } = sinon;

describe('unpublish', () => {
  const callStub = stub().returns(Promise.resolve());
  const unpublishStub = stub().returns(callStub);
  const contract = { methods: { unpublish: unpublishStub } };

  it('should unpublish the given url', (done) => {
    const url = 'http://google.com/';
    unpublish(contract)({ url }, null, (result) => {
      expect(result).to.eq(url);
      expect(unpublishStub.getCall(0).args).to.deep.eq([url]);
      done();
    });
  });
});