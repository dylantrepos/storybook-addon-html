"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _api = require("@storybook/api");

var _standalone = require("prettier/standalone");

var _parserHtml = _interopRequireDefault(require("prettier/parser-html"));

var _react2 = _interopRequireDefault(require("@monaco-editor/react"));

var _shared = require("./shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const HTMLPanel = () => {
  const [html, setHTML] = (0, _react.useState)('');
  const [code, setCode] = (0, _react.useState)('');
  const [block, setBlock] = (0, _react.useState)(false);
  const prettierConfig = {
    "arrowParens": "always",
    "bracketSameLine": false,
    "bracketSpacing": true,
    "embeddedLanguageFormatting": "auto",
    "htmlWhitespaceSensitivity": "css",
    "insertPragma": false,
    "jsxSingleQuote": false,
    "printWidth": 80,
    "proseWrap": "preserve",
    "quoteProps": "as-needed",
    "requirePragma": false,
    "semi": true,
    "singleQuote": true,
    "tabWidth": 2,
    "trailingComma": "es5",
    "useTabs": true,
    "vueIndentScriptAndStyle": false,
    // Ensure we always pick the html parser
    parser: 'html',
    plugins: [_parserHtml.default]
  };
  (0, _api.useChannel)({
    [_shared.EVENT_CODE_RECEIVED]: _ref => {
      let {
        html
      } = _ref;
      setHTML(html);
    }
  });
  (0, _react.useEffect)(() => {
    setCode((0, _standalone.format)(html, prettierConfig));
  }, [html]);
  return /*#__PURE__*/_react.default.createElement(_react2.default, {
    height: "90vh",
    defaultLanguage: "html",
    value: code,
    theme: "vs-dark"
  });
};

var _default = HTMLPanel;
exports.default = _default;