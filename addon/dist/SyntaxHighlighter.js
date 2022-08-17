"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

var _reactSyntaxHighlighter = _interopRequireDefault(require("react-syntax-highlighter"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const Pre = _theming.styled.pre(_ref => {
  let {
    theme,
    padded
  } = _ref;
  return {
    display: 'flex !important',
    justifyContent: 'flex-start',
    margin: 0,
    padding: padded ? "".concat(theme.layoutMargin, "px !important") : 0,
    tabSize: '2'
  };
});

const Code = _theming.styled.code(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  flex: 1;\n  padding-right: 0;\n  opacity: 1;\n  counter-reset: line;\n\n  .code-line {\n    counter-increment: line;\n    position: relative;\n    display: block;\n    margin-left: 1.5rem;\n  }\n\n  .code-line:before {\n    content: counter(line);\n    position: absolute;\n    margin-left: -1.5rem;\n    color: #000;\n  }\n"])));

class SyntaxHighlighter extends _react.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "state", {
      copied: false
    });

    _defineProperty(this, "onClick", e => {
      const {
        children
      } = this.props;
      e.preventDefault();
      const tmp = document.createElement('TEXTAREA');
      const focus = document.activeElement;
      tmp.value = children;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand('copy');
      document.body.removeChild(tmp);
      focus.focus();
      this.setState({
        copied: true
      }, () => {
        window.setTimeout(() => this.setState({
          copied: false
        }), 1500);
      });
    });
  }

  render() {
    const {
      children,
      language = 'jsx',
      copyable,
      bordered,
      padded,
      showLineNumbers = false,
      wrapLines = true,
      ...rest
    } = this.props;
    const {
      copied
    } = this.state;

    if (!children) {
      return null;
    }

    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_components.ScrollArea, {
      vertical: true
    }, /*#__PURE__*/_react.default.createElement(_reactSyntaxHighlighter.default, _extends({
      padded: padded || bordered,
      language: language,
      useInlineStyles: true,
      PreTag: Pre,
      CodeTag: Code,
      showLineNumbers: showLineNumbers,
      wrapLines: wrapLines,
      lineProps: {
        className: 'code-line'
      }
    }, rest), children.trim())), copyable && /*#__PURE__*/_react.default.createElement(_components.ActionBar, {
      actionItems: [{
        title: copied ? 'Copied' : 'Copy',
        onClick: this.onClick
      }]
    }));
  }

}

exports.default = SyntaxHighlighter;

_defineProperty(SyntaxHighlighter, "defaultProps", {
  language: null,
  copyable: false,
  bordered: false,
  padded: false
});