import { Button, Classes } from '@blueprintjs/core';

import classNames from 'classnames';
import { FC, memo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { encodeGamePacket } from 'tic-tac-toe/dist/protocol';
import { Socket } from '../socket/socket';

type Props = {
    socket: Socket;
};

export const Join: FC<Props> = memo(({ socket }) => {
    const history = useHistory();
    const [username, setUsername] = useState('');

    const join = () => {
        socket.send(encodeLobbyMessage(LOBBY_JOIN));
        socket.onMessage((message: any) => {
            if (message) {
                history.push('/lobby');
            }
        });
    };

    return (
        <div
            style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
            }}
        >
            <form
                style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={join}
            >
                <input
                    id="name"
                    placeholder="Name"
                    className={classNames(Classes.INPUT)}
                    onChange={(x) => setUsername(x.target.value)}
                    value={username}
                    autoFocus
                    autoComplete="off"
                    style={{ marginBottom: 10 }}
                />
                <Button
                    intent="primary"
                    disabled={!username.length}
                    onClick={join}
                >
                    Join
                </Button>
            </form>
        </div>
    );
});
