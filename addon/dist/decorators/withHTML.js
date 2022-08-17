"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withHTML = void 0;

var _addons = require("@storybook/addons");

var _shared = require("../shared");

const withHTML = (0, _addons.makeDecorator)({
  name: 'withHTML',
  parameterName: 'html',
  skipIfNoParametersOrOptions: false,
  wrapper: (storyFn, context, _ref) => {
    let {
      parameters = {}
    } = _ref;
    setTimeout(() => {
      const channel = _addons.addons.getChannel();

      const rootSelector = parameters.root || '#root';
      const root = document.querySelector(rootSelector);
      let html; // Check if HTML has been added manually, else get it from root

      if (parameters.code) {
        html = parameters.code;
      } else {
        html = root ? root.innerHTML : "".concat(rootSelector, " not found.");
      }

      if (parameters.removeEmptyComments) {
        html = html.replace(/<!--\s*-->/g, '');
      }

      console.log('params : ', parameters.code);
      console.log('context : ', context);
      channel.emit(_shared.EVENT_CODE_RECEIVED, {
        html,
        options: parameters
      });
    }, 0);
    return storyFn(context);
  }
});
exports.withHTML = withHTML;

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}