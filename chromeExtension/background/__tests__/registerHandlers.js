import registerHandlers from '../registerHandlers';
import { GET_ACCOUNTS, PUBLISH, UNPUBLISH, VERIFY } from '../../constants/messageTypes';

const { stub } = sinon;

describe('background', () => {
  describe('registerHandlers', () => {
    const addListenerStub = stub();

    const stubPromise = () => ({ then: stub() });
    const stubContractMethod = () => stub().returns(stubPromise());

    const getAccountsStub = stub().returns(stubPromise());
    const publishStub = stub().returns(stubContractMethod());
    const unpublishStub = stub().returns(stubContractMethod());
    const verifyStub = stub().returns(stubContractMethod());

    const chrome = {
      runtime: {
        onMessage: {
          addListener: addListenerStub,
        },
      },
    };

    const web3Instance = {
      eth: {
        getAccounts: getAccountsStub,
      },
    };

    const contract = {
      methods: {
        publish: publishStub,
        unpublish: unpublishStub,
        verify: verifyStub,
      },
    };

    const address = '0x104bf7f95dedb0aebe014a7aaf8b7cd025a07f93';
    const url = 'https://example.com/';

    it('register the listener and handle messages appropriately', () => {
      registerHandlers({ chrome, contract, web3Instance });
      const handler = addListenerStub.getCall(0).args[0];

      expect(() => handler({ type: GET_ACCOUNTS })).to.alter(() => getAccountsStub.callCount, { from: 0, to: 1 });
      expect(() => handler({ type: PUBLISH, url })).to.alter(() => publishStub.callCount, { from: 0, to: 1 });
      expect(() => handler({ type: UNPUBLISH, url })).to.alter(() => unpublishStub.callCount, { from: 0, to: 1 });
      expect(() => handler({ type: VERIFY, address, url })).to.alter(() => verifyStub.callCount, { from: 0, to: 1 });

      expect(getAccountsStub.getCall(0).args).to.deep.eq([]);
      expect(publishStub.getCall(0).args).to.deep.eq([url]);
      expect(unpublishStub.getCall(0).args).to.deep.eq([url]);
      expect(verifyStub.getCall(0).args).to.deep.eq([address, url]);
    });
  });
});