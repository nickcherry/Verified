export default (contract) => {
  return ({ url }, _sender, sendResponse) => {
    contract.methods.publish(url).call().then(() => {
      sendResponse(url);
    });
  };
};
