import React, { useEffect, useState } from 'react';
import { useChannel, useParameter } from '@storybook/api';

import { format as prettierFormat } from 'prettier/standalone';
import prettierHtml from 'prettier/parser-html';
import Editor from "@monaco-editor/react";

import { EVENT_CODE_RECEIVED } from './shared';

const PARAM_KEY = 'html';

const HTMLPanel = () => {
  const [html, setHTML] = useState('');
  const [code, setCode] = useState('');
  const [editor, setEditor] = useState(null);
  const [handled, sethandled] = useState(false);

  const parameters = useParameter(PARAM_KEY, {});
  const {
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

  if(editor && handled) {
    sethandled(false);
    editor.onDidChangeModelDecorations(() => {
      editor._actions['editor.action.formatDocument']._run()
      /**
       * ! LE PROBLEME : Cela arrive parceque les balises sont collés entre elles lors de l'écriture HTML
       */
    })
  }

  const test = (editor) => {
    setEditor(editor);
    sethandled(true)
  }

  return (
      <Editor
       height="90vh"
       defaultLanguage="html"
       value={code}
       theme="vs-dark"
       onMount={test}
     />
  );
};

export default HTMLPanel;
