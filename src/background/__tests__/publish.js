import publish from '../publish';

const { stub } = sinon;

describe('publish', () => {
  const callStub = stub().returns(Promise.resolve());
  const publishStub = stub().returns(callStub);
  const contract = { methods: { publish: publishStub } };

  it('should publish the given url', (done) => {
    const url = 'http://google.com/';
    publish(contract)({ url }, null, (result) => {
      expect(result).to.eq(url);
      expect(publishStub.getCall(0).args).to.deep.eq([url]);
      done();
    });
  });
});