import { DragEvent, ReactNode, useCallback, useState } from 'react';
import clsx from 'clsx';

const defaultUploadedFileRenderer = (fileName: string) => (
  <p
    key={fileName}
    className="pointer-events-none text-white p-4 font-medium text-sm m-auto inline-block font-sans"
  >
    {fileName}
  </p>
);

function ImageTagger({
  className,
  title,
  onDrop,
  acceptOnly,
  children,
  uploadedFileRenderer = defaultUploadedFileRenderer,
}: {
  className?: string;
  title?: string;
  onDrop?: (files: DataTransferItemList) => void;
  acceptOnly?: string[];
  name?: string;
  children?: ReactNode;
  uploadedFileRenderer?: (file: string) => ReactNode;
}) {
  const [status, setStatus] = useState('EMPTY');
  const [files, setFiles] = useState<string[]>([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDraggingOver(false);
      const _files = e.dataTransfer.items;
      const loadedFileNames = [];

      for (const file of _files) {
        const fileName = file.getAsFile()?.name;
        if ((!acceptOnly || (acceptOnly && acceptOnly.includes(file.type))) && fileName) {
          loadedFileNames.push(fileName);
        } else {
          setFiles([]);
        }
      }

      if (loadedFileNames.length !== _files.length) {
        setStatus('ERROR');
        return;
      }

      setFiles(loadedFileNames);

      if (onDrop) {
        onDrop?.(e.dataTransfer.items);
      }
    },
    [acceptOnly, onDrop],
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <div
        className={clsx(
          'flex items-center justify-center backdrop-blur-md',
          'bg-primary/50 border-primary border-2 min-w-10 min-h-10 block transition-opacity content-center th-blue',
          !isDraggingOver && 'opacity-0',
          className,
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="bg-primary/50 rounded-md p-4">
          <p className="pointer-events-none text-white font-medium text-sm m-auto inline-block font-sans">
            {title}
          </p>
        </div>
      </div>
      {files?.length ? (
        <>{files.map(uploadedFileRenderer)}</>
      ) : (
        <>
          {children}
          {status === 'ERROR' && (
            <span className="text-xs text-primary font-sans font-bold flex items-center gap-2 p-1 border rounded border-primary">
              Se subió un archivo no permitido.
            </span>
          )}
        </>
      )}
    </div>
  );
}

export default ImageTagger;
