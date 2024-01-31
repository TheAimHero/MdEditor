import { type editor } from 'monaco-editor';
import { type Dispatch, type SetStateAction } from 'react';

export type localFileDataType = {
  name: string;
  data: string;
  createdAt: Date;
  updatedAt: Date;
  images: number[];
};

export interface OptionProps {
  data: localFileDataType | undefined;
  setData: Dispatch<SetStateAction<localFileDataType | undefined>>;
  className?: string;
  editor?: editor.IStandaloneCodeEditor | null;
  setDrawerState?: Dispatch<SetStateAction<boolean>>;
}
