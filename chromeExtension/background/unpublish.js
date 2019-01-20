export default (contract) => {
  return ({ url }, _sender, sendResponse) => {
    contract.methods.unpublish(url).call().then((address) => {
      sendResponse(address);
    });
  };
};
