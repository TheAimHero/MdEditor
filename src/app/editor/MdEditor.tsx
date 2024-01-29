import React, { useEffect, type FC } from 'react';
import Editor, { type EditorProps, useMonaco } from '@monaco-editor/react';
import { useTheme } from 'next-themes';

interface Props {
  data?: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
}

const MdEditor: FC<Props> = ({ setData, data }) => {
  const props: EditorProps = {
    className: 'h-[clac(100vh-60px)] w-full',
    options: {
      scrollbar: { vertical: 'hidden', horizontal: 'hidden' },
      overviewRulerBorder: false,
      lineDecorationsWidth: 0,
      minimap: { enabled: false },
      overviewRulerLanes: 0,
    },
    theme: 'vs-dark',
    defaultLanguage: 'markdown',
    language: 'markdown',
    onChange: (value) => setData(value ?? ''),
    defaultValue: data,
    value: data,
  };
  const monaco = useMonaco();
  const { theme } = useTheme();
  useEffect(() => {
    if (!monaco) return;
    monaco.editor.defineTheme('dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.foreground': '#f6f8fa',
        'editor.background': '#020817',
        'editor.selectionBackground': '#4c2889',
        'editor.inactiveSelectionBackground': '#444d56',
        'editor.lineHighlightBackground': '#444d56',
        'editorCursor.foreground': '#ffffff',
        'editorWhitespace.foreground': '#6a737d',
        'editorIndentGuide.background': '#6a737d',
        'editorIndentGuide.activeBackground': '#f6f8fa',
        'editor.selectionHighlightBorder': '#444d56',
      },
    });
  }, [monaco]);
  useEffect(() => {
    if ((theme === 'dark' || theme === 'system') && monaco) {
      monaco.editor.setTheme('dark');
    } else if (monaco) {
      monaco.editor.setTheme('vs');
    }
  }, [monaco, theme]);
  return <Editor {...props} />;
};

export default MdEditor;
