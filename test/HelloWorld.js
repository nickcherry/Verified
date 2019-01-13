const HelloWorld = artifacts.require('HelloWorld');

contract('HelloWorld', (accounts) => {
  let contractInstance;
  beforeEach(async () => contractInstance = await HelloWorld.deployed());

  describe('sayHey', () => {
    it('should say hello', async () => {
      const response = await contractInstance.sayHey.call();
      expect(response).to.eq('Holler.');
    });
  });
});