const Registry = artifacts.require('Registry');

contract('Registry', () => {
  let contractInstance;
  beforeEach(async () => contractInstance = await Registry.deployed());

  describe('register', () => {
    it('should register the URL', async () => {
      const response = await contractInstance.register.call('http://google.com/');
      expect(response).to.eq('http://google.com/');
    });
  });
});