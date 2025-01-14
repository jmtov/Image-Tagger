import { useContext, useCallback, useMemo } from 'react';

import { FileTaggerContext, FileTaggerContextStateType } from './context';

export function useFileTaggerContext() {
  const [state, dispatch] = useContext(FileTaggerContext);

  const toggleItemSelection = useCallback((name: string) => {
    dispatch?.({ type: 'TOGGLE_ITEM_SELECTION', payload: name });
  }, []);

  const deleteItem = useCallback((name: string) => {
    dispatch?.({ type: 'DELETE_ITEM', payload: name });
  }, []);

  const toggleAll = useCallback(() => {
    dispatch?.({ type: 'TOGGLE_ALL' });
  }, []);

  const setFiles = useCallback((files: File[]) => {
    dispatch?.({ type: 'SET_FILES', payload: files });
  }, []);

  const setStatus = useCallback((status: FileTaggerContextStateType['status']) => {
    dispatch?.({ type: 'SET_STATUS', payload: status });
  }, []);

  const setSelection = useCallback((selection: Set<string>) => {
    dispatch?.({ type: 'SET_SELECTION', payload: selection });
  }, []);

  return {
    state,
    dispatch,
    toggleItemSelection,
    toggleAll,
    deleteItem,
    setFiles,
    setStatus,
    setSelection,
  };
}

export function useFileTaggerContextSelector<ReturnValue>(
  selector: (state: FileTaggerContextStateType) => ReturnValue,
) {
  const [state] = useContext(FileTaggerContext);

  const value = useMemo(() => selector(state), [state]);

  return value;
}
