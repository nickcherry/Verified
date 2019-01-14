import web3 from 'web3';
import {
  abi as helloWorldAbi,
  networks as helloWorldNetworks,
} from '../../builds/contracts/HelloWorld.json';

const httpProvider = new web3.providers.HttpProvider(process.env.NETWORK_URL);
const web3Instance = new web3(httpProvider);
const helloWorldAddress = Object.values(helloWorldNetworks)[0].address;
const helloWorldContract = new web3Instance.eth.Contract(helloWorldAbi, helloWorldAddress);

console.log('Hello from the background script. 👋');
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

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.executeScript(tab.id, {
    code: 'alert("hi")',
  });
});