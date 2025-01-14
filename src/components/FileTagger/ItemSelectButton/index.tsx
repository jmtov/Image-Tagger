import { ReactNode } from 'react';

import { useFileTaggerContextSelector, useFileTaggerContext } from '../hooks';

function FileTaggerItemSelectButton({
  children,
  className,
  name,
}: {
  children?: ReactNode;
  className?: string;
  name: string;
}) {
  const isSelected = useFileTaggerContextSelector((state) => state.selection.has(name));
  const { toggleItemSelection } = useFileTaggerContext();

  return (
    <button className={className} onClick={() => toggleItemSelection(name)}>
      {children}
      {!children && isSelected ? 'Deseleccionar' : 'Seleccionar'}
    </button>
  );
}

export default FileTaggerItemSelectButton;
