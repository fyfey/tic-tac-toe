import { AppAction, IAppContext } from './appContext';

export const appReducer = (
    state: IAppContext,
    action: AppAction
): IAppContext => {
    switch (action.type) {
        case 'JOIN':
            return { ...state, player: action.payload };
    }

    return state;
};
