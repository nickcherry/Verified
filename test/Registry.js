const Registry = artifacts.require('Registry');

contract('Registry', (accounts) => {
  let contractInstance;
  beforeEach(async () => contractInstance = await Registry.deployed());

  const ownAddress = accounts[0];
  const otherAddress = accounts[1];
  const url = 'http://example.com/';

  const verify = async (address, url, expectedResult) => {
    const result = await contractInstance.verify(address, url);
    expect(result).to.eq(expectedResult);
  };

  it('should publish, unpublish, and verify', async () => {
    await verify(ownAddress, url, false);
    await contractInstance.publish(url);
    await verify(ownAddress, url, true);
    await verify(ownAddress, 'http://example.com/', false);
    await verify(otherAddress, url, false);
    await contractInstance.unpublish(url);
    await verify(ownAddress, url, false);
  });
});