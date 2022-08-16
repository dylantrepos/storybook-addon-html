import React, { useEffect, useState } from 'react';
import { useChannel, useParameter } from '@storybook/api';

import SyntaxHighlighter from './SyntaxHighlighter';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/github-gist';
import { format as prettierFormat } from 'prettier/standalone';
import prettierHtml from 'prettier/parser-html';
import Editor from "@monaco-editor/react";

import { EVENT_CODE_RECEIVED } from './shared';

const PARAM_KEY = 'html';

const HTMLPanel = () => {
  const [html, setHTML] = useState('');
  const [code, setCode] = useState('');

  const parameters = useParameter(PARAM_KEY, {});
  const {
    highlighter: { showLineNumbers = false, wrapLines = true } = {},
    prettier = {},
  } = parameters;

  const prettierConfig = {
    htmlWhitespaceSensitivity: 'ignore',
    ...prettier,
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
