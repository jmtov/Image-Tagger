import { HTMLAttributes, MouseEvent, ReactNode, useCallback } from 'react';

import { useFileTaggerContext } from '../../hooks';

function FileTaggerResetFilesButton({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  className?: string;
}) {
  const { setFiles, setSelection, setStatus } = useFileTaggerContext();

  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    props?.onClick?.(e);
    setStatus('EMPTY');
    setFiles([]);
    setSelection(new Set());
  }, []);

  return (
    <button {...props} className={className} onClick={handleClick}>
      {children || 'Eliminar elementos'}
    </button>
  );
}

export default FileTaggerResetFilesButton;
