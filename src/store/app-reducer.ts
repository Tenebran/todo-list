const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status };

    case 'APP/SET-ERROR': {
      return { ...state, error: action.error };
    }
    default:
      return state;
  }
};

export const appSetStatusAC = (status: RequestStatusType) => {
  return { type: 'APP/SET-STATUS', status } as const;
};

export const appSetErrorAC = (error: string | null) => {
  return { type: 'APP/SET-ERROR', error } as const;
};

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

type ActionsType = ReturnType<typeof appSetStatusAC> | ReturnType<typeof appSetErrorAC>;

export type InitialStateType = typeof initialState;
