import { HTMLAttributes, ReactNode } from 'react';

import { useFileTaggerContext } from '../../hooks';

function FileTaggerItemDeleteButton({
  children,
  className,
  name,
  ...props
}: HTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  className?: string;
  name: string;
}) {
  const { deleteItem } = useFileTaggerContext();

  return (
    <button {...props} className={className} onClick={() => deleteItem(name)}>
      {children || 'Eliminar'}
    </button>
  );
}

export default FileTaggerItemDeleteButton;
