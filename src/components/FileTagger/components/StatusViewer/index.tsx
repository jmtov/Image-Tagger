import { useFileTaggerContextSelector } from '../../hooks';

function FileTaggerStatusViewer({ className }: { className?: string }) {
  const status = useFileTaggerContextSelector((state) => state.status);

  return <span className={className}>{status}</span>;
}

export default FileTaggerStatusViewer;
