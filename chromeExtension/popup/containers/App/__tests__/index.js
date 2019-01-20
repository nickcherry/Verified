import { mount } from 'enzyme'; // Hooks not currently supported for shallow rendering https://github.com/facebook/react/issues/14091
const { stub } = sinon;

import App from '..';
import Claims from '../../Claims';
import Publish from '../../Publish';

describe('<App />', () => {
  const accounts = ['0xf908de9e023fa433ce5f698bf56fb32726852cc7'],
        claims = [],
        html = '<html></html>',
        noop = () => {},
        tabId = 42,
        url = 'https://example.com/';

  let chrome,
      chromeRuntime = { sendMessage: noop },
      chromeTabs = { query: noop, executeScript: noop },
      chromeRunetimeSendMessageStub,
      chromeTabsQueryStub,
      chromeTabsExecuteScriptStub;

  beforeEach(() => {
    chromeRunetimeSendMessageStub = stub(chromeRuntime, 'sendMessage').callsFake((_request, callback) => {
      callback(accounts);
    });

    chromeTabsQueryStub = stub(chromeTabs, 'query').callsFake((_query, callback) => {
      callback([{ id: tabId, url }]);
    });

    chromeTabsExecuteScriptStub = stub(chromeTabs, 'executeScript').callsFake((_tabId, _options, callback) => {
      callback([{ url, html, claims }]);
    });

    chrome = { runtime: chromeRuntime, tabs: chromeTabs };
  });

  it('should render the app', async () => {
    const app = mount(<App chrome={chrome} />);

    await new Promise((resolve) => {
      const interval = setInterval(() => {
        if (chromeTabsExecuteScriptStub.callCount > 0 && chromeRunetimeSendMessageStub.callCount > 0) {
          clearInterval(interval);
          app.update();
          resolve();
        }
      });
    });

    expect(app.find(Claims).first().props()).to.deep.eq({
      claims,
      error: undefined,
      url,
    });

    expect(app.find(Publish).first().props()).to.deep.eq({
      accounts,
      claims,
      url,
    });
  });
});
