"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _api = require("@storybook/api");

var _standalone = require("prettier/standalone");

var _parserHtml = _interopRequireDefault(require("prettier/parser-html"));

var _react2 = _interopRequireWildcard(require("@monaco-editor/react"));

var _shared = require("./shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * ! Faire un bouton copier pour le html
 */
var HTMLPanel = function HTMLPanel() {
  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      html = _useState2[0],
      setHTML = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      code = _useState4[0],
      setCode = _useState4[1];

  var _useState5 = (0, _react.useState)('Copy'),
      _useState6 = _slicedToArray(_useState5, 2),
      copymessage = _useState6[0],
      setCopymessage = _useState6[1];

  var _useState7 = (0, _react.useState)('Copy without comments'),
      _useState8 = _slicedToArray(_useState7, 2),
      copyCommentmessage = _useState8[0],
      setCopyCommentmessage = _useState8[1];

  var _useState9 = (0, _react.useState)(true),
      _useState10 = _slicedToArray(_useState9, 2),
      darklight = _useState10[0],
      setDarklight = _useState10[1];

  var _useState11 = (0, _react.useState)(false),
      _useState12 = _slicedToArray(_useState11, 2),
      checkJs = _useState12[0],
      setCheckJs = _useState12[1];

  var _useState13 = (0, _react.useState)(''),
      _useState14 = _slicedToArray(_useState13, 2),
      htmlJS = _useState14[0],
      setHTMLJS = _useState14[1];

  var _useState15 = (0, _react.useState)(null),
      _useState16 = _slicedToArray(_useState15, 2),
      hasJS = _useState16[0],
      setHasJS = _useState16[1];

  var _useState17 = (0, _react.useState)(''),
      _useState18 = _slicedToArray(_useState17, 2),
      codeJS = _useState18[0],
      setCodeJS = _useState18[1];

  var prettierConfig = {
    "arrowParens": "always",
    "bracketSameLine": false,
    "bracketSpacing": true,
    "embeddedLanguageFormatting": "auto",
    "htmlWhitespaceSensitivity": "ignore",
    "insertPragma": false,
    "jsxSingleQuote": false,
    "printWidth": 150,
    "proseWrap": "preserve",
    "quoteProps": "as-needed",
    "requirePragma": false,
    "semi": true,
    "singleQuote": true,
    "tabWidth": 10,
    "trailingComma": "es5",
    "useTabs": true,
    "vueIndentScriptAndStyle": false,
    // Ensure we always pick the html parser
    parser: 'html',
    plugins: [_parserHtml.default]
  };
  (0, _api.useChannel)(_defineProperty({}, _shared.EVENT_CODE_RECEIVED, function (_ref) {
    var html = _ref.html,
        options = _ref.options;

    if (options.code) {
      setHTML(options.code);
      setHTMLJS(html);
    } else {
      setHTML(html);
      setHTMLJS('');
    }
  }));
  (0, _react.useEffect)(function () {
    setCode((0, _standalone.format)(html, prettierConfig)); // setCode(html);

    setCodeJS((0, _standalone.format)(htmlJS, prettierConfig)); // setCodeJS(htmlJS);

    console.log('Before : ', html);
    console.log('After : ', (0, _standalone.format)(html, prettierConfig));
  }, [html, htmlJS]);

  var copy = function copy() {
    navigator.clipboard.writeText(code);
    setCopymessage('Copied !');
    setTimeout(function () {
      return setCopymessage('Copy');
    }, 3000);
  };

  var copyWithoutComments = function copyWithoutComments() {
    var newCode = code.replaceAll(/<!--[\s\S]*?-->\n/g, '');
    navigator.clipboard.writeText((0, _standalone.format)(newCode, prettierConfig));
    setCopyCommentmessage('Copied !');
    setTimeout(function () {
      return setCopyCommentmessage('Copy without comments');
    }, 3000);
  };

  var handleChangeCode = function handleChangeCode(handleNewCode) {
    setCode(handleNewCode);
  };

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      'display': 'flex',
      'justifyContent': 'center'
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "monaco-copy",
    style: {
      'margin': '5px',
      'borderRadius': '100px',
      'border': 'none',
      'padding': '5px 15px',
      'backgroundImage': 'linear-gradient(95.85deg, #01b6cc 3.58%, #0179fe 95.77%)',
      'color': 'white',
      'fontWeight': 'bold',
      'cursor': 'pointer',
      'width': '100px',
      'height': '30px'
    },
    onClick: copy
  }, copymessage), /*#__PURE__*/_react.default.createElement("button", {
    className: "monaco-copy",
    style: {
      'margin': '5px',
      'borderRadius': '100px',
      'border': 'none',
      'padding': '5px 15px',
      'backgroundImage': 'linear-gradient(95.85deg, #01b6cc 3.58%, #0179fe 95.77%)',
      'color': 'white',
      'fontWeight': 'bold',
      'cursor': 'pointer',
      'width': '220px',
      'height': '30px'
    },
    onClick: copyWithoutComments
  }, copyCommentmessage), htmlJS ? /*#__PURE__*/_react.default.createElement("button", {
    className: "monaco-copy",
    style: {
      'margin': '5px',
      'borderRadius': '100px',
      'border': 'none',
      'padding': '5px 15px',
      'color': 'white',
      'fontWeight': 'bold',
      'cursor': 'pointer',
      'width': '190px',
      'height': '30px',
      'marginLeft': '30px',
      'backgroundImage': 'linear-gradient(95.85deg, #01b6cc 3.58%, #0179fe 95.77%)'
    },
    onClick: function onClick() {
      return setCheckJs(!checkJs);
    }
  }, checkJs ? 'Without JS loaded' : 'With JS loaded') : '', /*#__PURE__*/_react.default.createElement("button", {
    className: "monaco-copy",
    style: {
      'margin': '5px',
      'borderRadius': '100px',
      'border': 'none',
      'padding': '5px 15px',
      'color': "".concat(darklight ? 'black' : 'white'),
      'fontWeight': 'bold',
      'cursor': 'pointer',
      'width': '85px',
      'height': '30px',
      'marginLeft': '30px',
      'background': "".concat(darklight ? '#efefef' : 'black')
    },
    onClick: function onClick() {
      return setDarklight(!darklight);
    }
  }, darklight ? 'Light' : 'Dark')), htmlJS ? checkJs ? /*#__PURE__*/_react.default.createElement(_react2.DiffEditor, {
    height: "90vh",
    language: "html",
    original: code,
    modified: codeJS,
    theme: darklight ? 'vs-dark' : 'vs-light'
  }) : /*#__PURE__*/_react.default.createElement(_react2.default, {
    height: "90vh",
    defaultLanguage: "html",
    value: code,
    onChange: handleChangeCode,
    theme: darklight ? 'vs-dark' : 'vs-light',
    options: {
      minimap: {
        enabled: false
      }
    }
  }) : /*#__PURE__*/_react.default.createElement(_react2.default, {
    height: "90vh",
    defaultLanguage: "html",
    value: code,
    onChange: handleChangeCode,
    theme: darklight ? 'vs-dark' : 'vs-light',
    options: {
      minimap: {
        enabled: false
      }
    }
  }));
};

var _default = HTMLPanel;
exports.default = _default;