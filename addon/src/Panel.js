import React, { useEffect, useState } from 'react';
import { useChannel } from '@storybook/api';

import { format as prettierFormat } from 'prettier/standalone';
import prettierHtml from 'prettier/parser-html';
import Editor from "@monaco-editor/react";

import { EVENT_CODE_RECEIVED } from './shared';

/**
 * ! Faire un bouton copier pour le html
 */

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

  const copy = () => {
    navigator.clipboard.writeText(code)
  }

  const copyWithoutComments = () => {
    const newCode = code.replaceAll(/<!--[\s\S]*?-->\n/g, '')
    navigator.clipboard.writeText(prettierFormat(newCode, prettierConfig))
  }

  return (
      <div>
        <button className="monaco-copy" style={{
          'margin': '5px',
          'border-radius': '100px',
          'border': 'none',
          'padding': '5px 15px',
          'background-image': 'linear-gradient(95.85deg, #01b6cc 3.58%, #0179fe 95.77%)',
          'color': 'white',
          'font-weight': 'bold',
          'cursor': 'pointer',
        }} onClick={copy}>Copy</button>
        <button className="monaco-copy" style={{
          'margin': '5px',
          'border-radius': '100px',
          'border': 'none',
          'padding': '5px 15px',
          'background-image': 'linear-gradient(95.85deg, #01b6cc 3.58%, #0179fe 95.77%)',
          'color': 'white',
          'font-weight': 'bold',
          'cursor': 'pointer',
        }} onClick={copyWithoutComments}>Copy without comments</button>
        <Editor
          height="90vh"
          defaultLanguage="html"
          value={code}
          theme="vs-dark"
        />
      </div>
  );
};

export default HTMLPanel;
