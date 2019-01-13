import web3 from 'web3';
import { abi as helloWorldAbi } from '../builds/contracts/HelloWorld.json';

const httpProvider = new web3.providers.HttpProvider(process.env.NETWORK_URL);
const web3Instance = new web3(httpProvider);
const helloWorldContract = new web3Instance.eth.Contract(helloWorldAbi, '0x32b2910669f603483db5ABCa3B740cdb9c5887B5');

console.log('Hello from the background script. 👋')
console.log('web3Instance:', web3Instance);
console.log('helloWorldContract:', helloWorldContract);

chrome.runtime.onMessage.addListener(({ type }, _sender, sendResponse) => {
  if (type === 'sayHey') {
    helloWorldContract.methods.sayHey().call().then((response) => {
      sendResponse(response);
    });
    return true;
  }
});