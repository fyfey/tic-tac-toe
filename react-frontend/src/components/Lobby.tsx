import React, { FC, useContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import { LobbyProvider } from '../state/lobby/lobbyContext';
import { Page } from './Page';
import { Socket } from '../socket/socket';

type Props = {
    socket: Socket;
};

export const Lobby: FC<Props> = ({ socket }) => {
    const LobbyStyle = createGlobalStyle`
    .Lobby {
        display: grid;
        grid-template-areas:
            "a b"
            "a c";
        grid-template-columns: 150px 1fr;
        grid-template-rows: 1fr 100px;
        gap: 5px;
        height: 100%;
        color: #9099a0;
    }
    .friends {
        grid-area: a;
        background-color: #141a1f;
        border-radius: 5px;
        padding: 5px;
    }
    .chat {
        grid-area: b;
        background-color: #141a1f;
        border-radius: 5px;
        padding: 5px;
    }
    .chatEntry {
        grid-area: c;
        background-color: #141a1f;
        border-radius: 5px;
        padding: 5px;
    }
  `;
    return (
        <Page>
            <LobbyProvider>
                <LobbyStyle />
                <div className="Lobby">
                    <div className="friends">PLAYERS</div>
                    <div className="chat">CHAT</div>
                    <div className="chatEntry">CHAT ENTRY</div>
                </div>
            </LobbyProvider>
        </Page>
    );
};
