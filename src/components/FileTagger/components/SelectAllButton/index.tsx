import { ReactNode } from 'react';

import { useFileTaggerContext } from '../../hooks';

function FileTaggerSelectAllButton({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const { toggleAll } = useFileTaggerContext();
  return (
    <button className={className} onClick={toggleAll}>
      {children || 'Seleccionar todos'}
    </button>
  );
}

export default FileTaggerSelectAllButton;
