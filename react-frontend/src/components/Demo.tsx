import { Button, ButtonGroup, FocusStyleManager, Intent, Label, Position, Tooltip } from '@blueprintjs/core'
import React, { useEffect, useState } from 'react'
import { createGlobalStyle } from 'styled-components';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { sleep, hex, binary } from '../utils';
import { Board } from './Board';

export const Game = () => {
  FocusStyleManager.onlyShowFocusOnTabs();
  const GlobalStyle = createGlobalStyle`
    body {
      background-color: #111;
      text-shadow: 1px 1px black;
    }
    .board .cell {
      background-color: #19191c;
      border-color: #000;
    }
  `;
  const [state, setState] = useState({
    tooltipOpen: false,
    boardTipOpen: false,
    infoTipOpen: false,
  });
  const [storage, setStorage] = useLocalStorage('app', {
    showIntro: true,
    player: 1,
    board: 0,
  });
  useEffect(() => {
    (async() => {
      if (!storage.showIntro) {
        return;
      }
      await sleep(500);
      setState(s => ({...s, tooltipOpen: true}));
      await sleep(700);
      setStorage({...storage, player: 0});
      await sleep(700);
      setStorage({...storage, player: 3});
      await sleep(700);
      setStorage({...storage, player: 1});
      setState(s => ({...s, tooltipOpen: false}));
      setState(s => ({...s, boardTipOpen: true}));
      setStorage({...storage, board: 256});
      await sleep(700);
      setStorage({...storage, board: 3328});
      await sleep(700);
      setState(s => ({...s, boardTipOpen: false}));
      setState(s => ({...s, infoTipOpen: true}));
      await sleep(1500);
      setState(s => ({...s, infoTipOpen: false}));
      setStorage({...storage, board: 0});
      setStorage({ ...storage, showIntro: false });
    })();
  }, []);
    return (
        <>
      <div style={{ backgroundColor: '#000', borderRadius: 5, zIndex: 2, boxShadow: "0 0 10px #000", display: "inline-block" }}>
        <ButtonGroup style={{ overflow: 'hidden', borderTopRightRadius: 5, borderTopLeftRadius: 5 }}>
          <Button
            rightIcon="user"
            style={{ borderBottomLeftRadius: 0, width: 100 }}
            onClick={() => setStorage({ ...storage, player: 1 })}
            active={storage.player === 1}
          >
            Player 1
          </Button>
  <Tooltip position={Position.BOTTOM} intent={Intent.PRIMARY} content="Select cell state" isOpen={state.tooltipOpen}>
            <Button
              style={{ width: 60 }}
              onClick={() => setStorage({ ...storage, player: 0 })}
              active={storage.player === 0}
            >
              Empty
            </Button>
          </Tooltip>
          <Button
            icon="user"
            style={{ borderBottomRightRadius: 0, width: 98 }}
            onClick={() => setStorage({ ...storage, player: 3 })}
            active={storage.player === 3}
           > 
            Player 2
          </Button>
        </ButtonGroup>
        <br/>
        <Tooltip position={Position.RIGHT} intent={Intent.PRIMARY} content="Set cell state" isOpen={state.boardTipOpen}>
          <Board
            size={3}
            player={storage.player as 1 | 3}
            value={storage.board}
            onChange={(val) => setStorage({ ...storage, board: val })}
          ></Board>
        </Tooltip>
      </div><br />
      <Tooltip content="Observe board state" intent={Intent.PRIMARY} isOpen={state.infoTipOpen} position={Position.BOTTOM} >
        <pre style={{ marginLeft: 20, color: 'grey', fontFamily: '"Roboto Mono", monospace' }}>
          <Label> Board:</Label> { storage.board }<br />
          <Label>   Hex:</Label> { hex(storage.board, 2) }<br />
          <Label>Binary:</Label> { binary(storage.board, 18) }
        </pre>
      </Tooltip>
      </>
    )
}