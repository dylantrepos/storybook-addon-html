import React, { useEffect, useState } from 'react';
import { useChannel } from '@storybook/api';

import { format as prettierFormat } from 'prettier/standalone';
import prettierHtml from 'prettier/parser-html';
import Editor from "@monaco-editor/react";

import { EVENT_CODE_RECEIVED } from './shared';

const HTMLPanel = () => {
  const [html, setHTML] = useState('');
  const [code, setCode] = useState('');

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
    plugins: [prettierHtml],
  };

  useChannel({
    [EVENT_CODE_RECEIVED]: ({ html }) => {
      setHTML(html);
    },
  });

  useEffect(() => {
    setCode(prettierFormat(html, prettierConfig));
  }, [html]);

  return (
      <Editor
       height="90vh"
       defaultLanguage="html"
       value={code}
       theme="vs-dark"
     />
  );
};

export default HTMLPanel;
