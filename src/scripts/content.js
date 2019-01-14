console.log('Hello from the content script. 👋');

chrome.runtime.sendMessage({ type: 'sayHey' }, (response) => {
  console.log('sayHey response:', response);
});