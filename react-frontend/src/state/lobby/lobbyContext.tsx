import { createContext, Dispatch, FC, Reducer, useReducer } from 'react';
import { Game, Player } from 'tic-tac-toe';
import { Action } from '../action';
import { lobbyReducer } from './lobbyReducer';

export interface ILobbyContext {
    player: Player | null;
    players: { [id: string]: Player };
    chat: { player: Player; message: string; date: Date }[];
    games: { [has: string]: Game };
}

const initialState: ILobbyContext = {
    player: null,
    players: {},
    chat: [],
    games: {},
};

export const LobbyContext = createContext<
    [state: ILobbyContext, dispatch: Dispatch<LobbyAction>]
>([initialState, () => null]);

export type LobbyActionType = 'JOIN';

export interface LobbyAction extends Action {
    type: LobbyActionType;
}

export const LobbyProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer<Reducer<ILobbyContext, LobbyAction>>(
        lobbyReducer,
        initialState
    );
    return (
        <LobbyContext.Provider value={[state, dispatch]}>
            {children}
        </LobbyContext.Provider>
    );
};
