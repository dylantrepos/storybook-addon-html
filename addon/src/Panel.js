import React, { useEffect, useState } from 'react';
import { useChannel } from '@storybook/api';

import { format as prettierFormat } from 'prettier/standalone';
import prettierHtml from 'prettier/parser-html';
import Editor, {DiffEditor} from "@monaco-editor/react";

import { EVENT_CODE_RECEIVED } from './shared';

const HTMLPanel = () => {
  const [html, setHTML] = useState('');
  const [code, setCode] = useState('');
  const [copymessage, setCopymessage] = useState('Copy')
  const [copyCommentmessage, setCopyCommentmessage] = useState('Copy without comments')
  const [darklight, setDarklight] = useState(true);
  const [checkJs, setCheckJs] = useState(false);
  const [htmlJS, setHTMLJS] = useState('');
  const [codeJS, setCodeJS] = useState('');

  const prettierConfig = {
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
    plugins: [prettierHtml],
  };

  useChannel({
    [EVENT_CODE_RECEIVED]: ({ html, options }) => {
      if(options.code) {
        setHTML(options.code);
        setHTMLJS(html);
      } else {
        setHTML(html);
        setHTMLJS('');
      }
    },
  });

  useEffect(() => {
    setCode(prettierFormat(html, prettierConfig));
    setCodeJS(prettierFormat(htmlJS, prettierConfig));
  }, [html, htmlJS]);

  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopymessage('Copied !');
    setTimeout(() => setCopymessage('Copy'), 3000)
  }

  const copyWithoutComments = () => {
    const newCode = code.replaceAll(/<!--[\s\S]*?-->\n/g, '')
    navigator.clipboard.writeText(prettierFormat(newCode, prettierConfig))
    setCopyCommentmessage('Copied !');
    setTimeout(() => setCopyCommentmessage('Copy without comments'), 3000)
  }

  const handleChangeCode = (handleNewCode) => {
    setCode(handleNewCode);
  }



  return (
      <div>
        <div style={{
          'display': 'flex',
          'justifyContent': 'center',
        }}>
          <button className="monaco-copy" style={{
            'margin': '5px',
            'borderRadius': '100px',
            'border': 'none',
            'padding': '5px 15px',
            'backgroundImage': 'linear-gradient(95.85deg, #01b6cc 3.58%, #0179fe 95.77%)',
            'color': 'white',
            'fontWeight': 'bold',
            'cursor': 'pointer',
            'width': '100px',
            'height': '30px',
          }} onClick={copy}>{copymessage}</button>
          <button className="monaco-copy" style={{
            'margin': '5px',
            'borderRadius': '100px',
            'border': 'none',
            'padding': '5px 15px',
            'backgroundImage': 'linear-gradient(95.85deg, #01b6cc 3.58%, #0179fe 95.77%)',
            'color': 'white',
            'fontWeight': 'bold',
            'cursor': 'pointer',
            'width': '220px',
            'height': '30px',
          }} onClick={copyWithoutComments}>{copyCommentmessage}</button>
          {htmlJS ?
            <button className="monaco-copy" style={{
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
              'backgroundImage': 'linear-gradient(95.85deg, #01b6cc 3.58%, #0179fe 95.77%)',
            }} onClick={() => setCheckJs(!checkJs)}>{checkJs ? 'Without JS loaded' : 'With JS loaded'}</button> : ''}
            <button className="monaco-copy" style={{
            'margin': '5px',
            'borderRadius': '100px',
            'border': 'none',
            'padding': '5px 15px',
            'color': `${darklight ? 'black' : 'white'}`,
            'fontWeight': 'bold',
            'cursor': 'pointer',
            'width': '85px',
            'height': '30px',
            'marginLeft': '30px',
            'background': `${darklight ? '#efefef' : 'black'}`
          }} onClick={() => setDarklight(!darklight)}>{darklight ? 'Light' : 'Dark'}</button>

        </div>
        {htmlJS ?
          checkJs
            ?  <DiffEditor
                  height="90vh"
                  language="html"
                  original={code}
                  modified={codeJS}
                  theme={darklight ? 'vs-dark' : 'vs-light'}
                />
            :  <Editor
                  height="90vh"
                  defaultLanguage="html"
                  value={code}
                  onChange={handleChangeCode}
                  theme={darklight ? 'vs-dark' : 'vs-light'}
                  options={{
                    minimap: {
                      enabled: false
                    }
                  }}
                />

          : <Editor
          height="90vh"
          defaultLanguage="html"
          value={code}
          onChange={handleChangeCode}
          theme={darklight ? 'vs-dark' : 'vs-light'}
          options={{
            minimap: {
              enabled: false
            }
          }}
        />
        }
      </div>
  );
};

export default HTMLPanel;
