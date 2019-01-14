chrome.runtime.sendMessage({ type: 'sayHey' }, (response) => {
  console.log('sayHey response:', response);
});