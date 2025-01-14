import { Dispatch, createContext, ReactNode, useReducer, useMemo } from 'react';

type FileTaggerContextValueType = [
  FileTaggerContextStateType,
  Dispatch<FileTaggerReducerActionType> | undefined,
];

export type FileTaggerContextStateType = {
  status: 'EMPTY' | 'NOT_INITIALIZED' | 'LOADED' | 'ERROR';
  selection: Set<string>;
  files?: File[];
};

type FileTaggerReducerActionType =
  | { type: 'SET_STATUS'; payload: FileTaggerContextStateType['status'] }
  | { type: 'SET_FILES'; payload: FileTaggerContextStateType['files'] }
  | { type: 'TOGGLE_ITEM_SELECTION'; payload: string }
  | { type: 'TOGGLE_ALL' }
  | { type: 'DELETE_ITEM'; payload: string }
  | { type: 'SET_SELECTION'; payload: Set<string> };

type FileTaggerReducerType = (
  state: FileTaggerContextStateType,
  action: FileTaggerReducerActionType,
) => FileTaggerContextStateType;

const baseState: FileTaggerContextStateType = {
  status: 'NOT_INITIALIZED',
  selection: new Set(),
  files: [],
};

export const FileTaggerContext = createContext<FileTaggerContextValueType>([baseState, undefined]);

export function FileTaggerContextProvider({ children }: { children?: ReactNode }) {
  const reducer = useReducer<FileTaggerReducerType>(FileTaggerReducer, baseState);

  const value = useMemo(() => reducer, [reducer]);

  return <FileTaggerContext.Provider value={value}>{children}</FileTaggerContext.Provider>;
}

function FileTaggerReducer(
  state: FileTaggerContextStateType,
  action: FileTaggerReducerActionType,
): FileTaggerContextStateType {
  if (action.type === 'SET_FILES') {
    let status = state.status;

    if (!action.payload || !action.payload.length) {
      status = 'EMPTY';
    }

    return {
      ...state,
      files: action.payload,
      status,
    };
  }

  if (action.type === 'SET_STATUS') {
    return {
      ...state,
      status: action.payload,
    };
  }

  if (action.type === 'TOGGLE_ITEM_SELECTION') {
    const newSelection = new Set(state.selection);

    if (newSelection.has(action.payload)) {
      newSelection.delete(action.payload);
    } else {
      newSelection.add(action.payload);
    }
    return {
      ...state,
      selection: newSelection,
    };
  }

  if (action.type === 'DELETE_ITEM') {
    const newFiles = state.files?.filter((file) => file.name !== action.payload);

    return {
      ...state,
      files: newFiles,
    };
  }

  if (action.type === 'SET_SELECTION') {
    const newSelection = new Set<string>(action.payload || []);

    return {
      ...state,
      selection: newSelection,
    };
  }

  if (action.type === 'TOGGLE_ALL') {
    if (state.selection.size === state.files?.length) {
      return {
        ...state,
        selection: new Set(),
      };
    }

    return {
      ...state,
      selection: new Set(state.files?.map((file) => file.name)),
    };
  }

  return state;
}
