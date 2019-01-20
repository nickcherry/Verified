require('@babel/polyfill');

const React = require('react');
const { JSDOM } = require('jsdom');
const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');
const chai = require('chai');
const chaiChange = require('chai-change');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(chaiChange);
chai.use(sinonChai);
Enzyme.configure({ adapter: new EnzymeAdapter() });

const document = new JSDOM('<!doctype html><html><body></body></html>');

global.document = document.window.document;
global.window = document.window;
global.React = React;
global.expect = chai.expect;
global.sinon = sinon;