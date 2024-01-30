import React, {
  useEffect,
  type FC,
  type SetStateAction,
  type Dispatch,
} from 'react';
import Editor, { type EditorProps, useMonaco } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { Loader2 } from 'lucide-react';
import { type localFileDataType } from '@/lib/types';
import { type editor } from 'monaco-editor';

interface Props {
  data?: localFileDataType;
  setData: Dispatch<SetStateAction<localFileDataType | undefined>>;
  setEditor: Dispatch<SetStateAction<editor.IStandaloneCodeEditor | null>>;
}

const MdEditor: FC<Props> = ({ setData, data, setEditor }) => {
  function handleEditorChange(value: string | undefined) {
    if (!value) return;
    setData((prevData) => {
      if (!prevData)
        return {
          createdAt: new Date(),
          updatedAt: new Date(),
          name: `Untitled-${localStorage.length + 1}`,
          data: '',
        };
      return { ...prevData, data: value, updatedAt: new Date() };
    });
  }
  const props: EditorProps = {
    className: 'flex-1 w-full',
    options: {
      scrollbar: { vertical: 'hidden', horizontal: 'hidden' },
      overviewRulerBorder: false,
      lineDecorationsWidth: 0,
      minimap: { enabled: false },
      overviewRulerLanes: 0,
    },
    onMount: (editor) => setEditor(editor),
    theme: 'vs-dark',
    defaultLanguage: 'markdown',
    language: 'markdown',
    loading: (
      <div className='my-auto flex h-full w-full items-center justify-between dark:bg-[#020817]'>
        <Loader2 className='mx-auto h-10 w-10 animate-spin' />
      </div>
    ),
    onChange: handleEditorChange,
    defaultValue: data?.data,
    value: data?.data,
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
