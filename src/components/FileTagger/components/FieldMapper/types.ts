import { HTMLProps } from 'react';

export type SelectFieldConfig = {
  type: 'select';
  name: string;
  properties: HTMLProps<HTMLSelectElement> & {
    options: {
      id: string;
      title: string;
    }[];
  };
};

export type InputFieldConfig = {
  type: 'input';
  name: string;
  properties: HTMLProps<HTMLInputElement>;
};

export type FieldMapperField = (SelectFieldConfig | InputFieldConfig) & {
  value?: string;
  disabled?: boolean;
};
