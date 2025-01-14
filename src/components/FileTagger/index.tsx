/* eslint-disable react/no-multi-comp */
import { FormEvent, ReactNode, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';

import { FieldMapperField } from './components/FieldMapper/types';
import { fields } from './constants';
import { FileTaggerContextProvider } from './context';
import { getFileURL } from './utils';
import { useFileTaggerContextSelector } from './hooks';
import FieldMapper from './components/FieldMapper';
import FileTaggerStatusViewer from './components/StatusViewer';
import FileTaggerFileSelector from './components/FileSelector';
import FileTaggerItemSelectButton from './ItemSelectButton';
import FileTaggerItemDeleteButton from './components/ItemDeleteButton';
import FileTaggerResetFilesButton from './components/ResetFilesButton';
import FileTaggerSelectAllButton from './components/SelectAllButton';

function ImageFile({ file, values }: { file: File; values?: Record<string, string> | null }) {
  const [src, setSrc] = useState<string | null>('');

  useEffect(() => {
    getFileURL(file).then((_src) => setSrc(_src));
  }, []);

  console.log(`Rendered: ${file.name}`);

  if (src) {
    return (
      <div className="flex gap-2 fade-in-center delayed items-start bg-white rounded-md p-2">
        <img src={src} alt="" className="size-28 object-cover rounded-md" />
        <div className="flex flex-col gap-2 w-72">
          <div className="flex flex-col gap-4 bg-blue-500/5 p-2 rounded-md">
            <span>
              <strong>Fields</strong>
            </span>
            <FieldsMapper fields={fields} values={values} />
          </div>
          <div className="flex flex-col gap-2 bg-blue-500/5 p-2 rounded-md">
            <details>
              <summary>
                <span>
                  <strong>Metadata</strong>
                </span>
              </summary>
              <span className="text-xs">Name: {file.name}</span>
              <span className="text-xs">Type: {file.type}</span>
            </details>
          </div>
        </div>
      </div>
    );
  }
}

function FieldsMapper({
  fields,
  values,
}: {
  fields: FieldMapperField[];
  values?: Record<string, string> | null;
}) {
  return fields.map((field) => {
    const value = values?.[field.name];

    if (field.type === 'select') {
      return (
        <FieldMapper
          key={field.name}
          name={field.name}
          properties={field.properties}
          type="select"
          value={value}
        />
      );
    }

    if (field.type === 'input') {
      return (
        <FieldMapper
          key={field.name}
          name={field.name}
          properties={field.properties}
          type="input"
          value={value}
        />
      );
    }
  });
}

function FileTagger({
  className,
  defaultValues,
}: {
  className?: string;
  title?: string;
  onFileLoad?: (files: File[]) => void;
  acceptOnly?: string[];
  name?: string;
  uploadedFileRenderer?: (file: File) => ReactNode;
  multiple?: boolean;
  defaultValues?: Record<string, string>;
}) {
  const [values, setValues] = useState<Record<string, string> | null>(defaultValues || null);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const _values = Object.fromEntries(formData.entries()) as Record<string, string>;
    setValues(_values);
  }, []);

  const handleConfirm = useCallback(() => {
    console.log(values);
  }, []);

  useEffect(
    () => () => {
      if (values !== null) {
        setValues(null);
      }
    },
    [values],
  );

  return (
    <FileTaggerContextProvider>
      <div className={clsx('grid items-center p-4 relative gap-8', className)}>
        <form onSubmit={handleSubmit} className="z-10 grid gap-2 bg-black/5 p-4 rounded-md">
          <FieldsMapper fields={fields} />
          <div className="flex gap-4">
            <button type="submit">Aplicar</button>
            <button type="button" onClick={handleConfirm}>
              Confirmar cambios
            </button>
            <FileTaggerSelectAllButton />
            <FileTaggerResetFilesButton />
          </div>
        </form>
        <FileTaggerFileSelector
          multiple
          className={clsx(
            'flex items-center justify-center backdrop-blur-md w-full h-full rounded-md',
            'bg-black/10 min-w-10 min-h-10 block transition-opacity content-center th-blue opacity-70',
          )}
          styles={{
            dragging: 'opacity-100',
            idle: 'opacity-70',
          }}
        />
        <FileTaggerStatusViewer />
        <FilesRenderer
          className="flex flex-col gap-4"
          itemRenderer={({ isSelected, item }) => (
            <div
              key={item.name}
              className={clsx(
                'flex flex-col gap-2 rounded-lg p-1',
                'delayed fade-in-left',
                isSelected && 'ring-2',
              )}
            >
              <ImageFile key={item.name} file={item} values={isSelected ? values : undefined} />
              <div className="flex gap-2">
                <FileTaggerItemDeleteButton name={item.name} />
                <FileTaggerItemSelectButton name={item.name} />
              </div>
            </div>
          )}
        />
      </div>
    </FileTaggerContextProvider>
  );
}

function FilesRenderer({
  itemRenderer,
  className,
}: {
  itemRenderer: (props: { isSelected: boolean; item: File }) => ReactNode;
  className?: string;
}) {
  const files = useFileTaggerContextSelector<File[] | undefined>((state) => state.files);
  const selection = useFileTaggerContextSelector<Set<string>>((state) => state.selection);

  if (!files?.length) {
    return null;
  }

  return (
    <div className={className}>
      {files.map((file) => itemRenderer({ item: file, isSelected: selection.has(file.name) }))}
    </div>
  );
}

export default FileTagger;
