import { shallow } from 'enzyme';
import Claims from '..';

describe('<Claims />', () => {
  const url = 'https://example.com'

  describe('when neither claims or a url is given', () => {
    it('should render an appropriate message', () => {
      expect(shallow(<Claims />).text()).to.include(`No content verifications were found.`);
    });
  });

  describe('when no claims are given, but a url is present', () => {
    it('should render an appropriate message', () => {
      expect(shallow(<Claims url={url} />).text()).to.include(`No content verifications were found at ${url}.`);
    });
  });

  describe('when an error is given', () => {
    it('should render the error', () => {
      const error = 'Something went wrong.';
      expect(shallow(<Claims url={url} error={error} />).text()).to.include(error);
    });
  });

  describe('when claims are given', () => {

  });
});