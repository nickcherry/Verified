export default (contract) => {
  return ({ address, url }, _sender, sendResponse) => {
    contract.methods.verify(address, url).call().then((response) => {
      sendResponse(response);
    });
  };
};
