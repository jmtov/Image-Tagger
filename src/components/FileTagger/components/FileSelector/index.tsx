import { ReactNode, useState, useCallback, ChangeEvent, DragEvent } from 'react';
import clsx from 'clsx';

import { useFileTaggerContext } from '../../hooks';

function FileTaggerFileSelector({
  children,
  className,
  multiple,
  onFileLoad,
  acceptOnly,
  styles,
}: {
  children?: ReactNode;
  className?: string;
  onFileLoad?: (files: File[]) => void;
  acceptOnly?: string[];
  multiple?: boolean;
  styles?: {
    dragging?: string;
    idle?: string;
  };
}) {
  const { setFiles, setStatus } = useFileTaggerContext();
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleFileInput = useCallback((_files?: FileList | null) => {
    const _newFiles: File[] = [];
    if (!_files) return;

    for (const file of _files) {
      const fileName = file.name;
      if ((!acceptOnly || (acceptOnly && acceptOnly.includes(file.type))) && fileName) {
        _newFiles.push(file);
      } else {
        setFiles([]);
      }
    }

    if (_newFiles.length !== _files.length) {
      setStatus('ERROR');
      return;
    }

    if (onFileLoad) {
      onFileLoad?.(_newFiles);
    }

    console.log({ _newFiles });

    setFiles(_newFiles);
    setStatus('LOADED');
  }, []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    handleFileInput(e.currentTarget.files);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      setIsDraggingOver(false);
      handleFileInput(e.dataTransfer.files);
    },
    [acceptOnly, onFileLoad],
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
  }, []);

  return (
    <label
      className={clsx(className, isDraggingOver ? styles?.dragging : styles?.idle)}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {children || <span>Drop files here</span>}
      <input
        type="file"
        className="opacity-0 appearance-none w-0 h-0"
        multiple={multiple}
        onChange={handleChange}
      />
    </label>
  );
}

export default FileTaggerFileSelector;
