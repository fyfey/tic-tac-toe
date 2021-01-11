import { createContext, Dispatch, FC, Reducer, useReducer } from 'react';
import { Player } from 'tic-tac-toe';
import { Action } from '../action';
import { appReducer } from './appReducer';

export interface IAppContext {
    player: Player | null;
}

type AppActionTypes = 'JOIN';

export interface AppAction extends Action {
    type: AppActionTypes;
}
const initialState = {
    player: null,
};

export const AppContext = createContext<
    [state: IAppContext, dispatch: Dispatch<AppAction>]
>([initialState, () => null]);
export const AppProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer<Reducer<IAppContext, AppAction>>(
        appReducer,
        initialState
    );

    return (
        <AppContext.Provider value={[state, dispatch]}>
            {children}
        </AppContext.Provider>
    );
};
