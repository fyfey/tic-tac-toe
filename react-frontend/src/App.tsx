import { createGlobalStyle } from 'styled-components';
import { FocusStyleManager } from '@blueprintjs/core';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { Game } from './components/Game';
import { Join } from './components/Join';
import { Lobby } from './components/Lobby';
import { AppProvider } from './state/app/appContext';
import { Socket } from './socket/socket';
import { useEffect, useState } from 'react';

function App() {
    FocusStyleManager.onlyShowFocusOnTabs();
    const [socket, setSocket] = useState<Socket>();
    useEffect(() => {
        const s = new Socket('ws://localhost:8000');
        s.connect();
        setSocket(s);
    }, []);
    if (!socket) {
        return null;
    }
    const GlobalStyle = createGlobalStyle`
    html {
      height: 100%;
      margin: 0;
      padding: 0;
    }
    body {
      margin: 0;
      padding: 0;
      background-color: #293742;
      text-shadow: 1px 1px black;
      height: 100%;
      text-shadow: none;
    }
    .App {
      height: 100%;
    }
    #root {
      height: 100%;
    }
  `;
    return (
        <div className="App bp3-dark">
            <GlobalStyle />
            <AppProvider>
                <MemoryRouter>
                    <Switch>
                        <Route path="/" exact>
                            <Join socket={socket} />
                        </Route>
                        <Route path="/lobby">
                            <Lobby socket={socket} />
                        </Route>
                        <Route path="/game">
                            <Game />
                        </Route>
                    </Switch>
                </MemoryRouter>
            </AppProvider>
        </div>
    );
}

export default App;
