export enum MessageType {
    GAME_MOVE,
    /**
     * Set username
     * Packet structure:
     * ┌───3───┬─3─┬─2─┬─1─┐
     * | n...0 | 0 | 0 | 2 |
     * 1. Mode     (2)
     * 1. Action   (0)
     * 2. Length   (0-f)
     * 3. Username (0-f[0:f])
     */
    LOBBY_SET_USERNAME,
    /**
     * Join
     */
    LOBBY_PLAYER_JOIN, //  136..len..128|127..uuid..0
    LOBBY_PLAYER_LEAVE,
    LOBBY_SEND_MESSAGE,
    LOBBY_RECEIVE_MESSAGE,
    LOBBY_GAME_CHALLENGE,
    LOBBY_GAME_ACCEPT,
    LOBBY_GAME_REJECT,
    LOBBY_GAME_RESULT,
    LOBBY_DM_SEND,
    LOBBY_DM_RECEIVE,
    GAME_SEARCH, // Server is searching for game
    GAME_START, // Server has matched
    GAME_QUIT, // Other player has left
    GAME_PLAYER_ONE, // You are player one (go first)
    GAME_PLAYER_TWO, // You are player two (go second)
    GAME_WIN_ONE,
    GAME_WIN_TWO,
    GAME_STALE_MATE,
}

export enum Type {
    String,
    Int,
    Uuid,
}

export const PacketMap: {
    [type: number]: { name: string; type: Type }[];
} = {
    [MessageType.GAME_MOVE]: [
        { name: 'player', type: Type.Int },
        { name: 'x', type: Type.Int },
        { name: 'y', type: Type.Int },
    ],
    [MessageType.LOBBY_SET_USERNAME]: [{ name: 'name', type: Type.String }],
    [MessageType.LOBBY_PLAYER_JOIN]: [
        // Broadcast to the lobby
        { name: 'name', type: Type.String },
        { name: 'socketId', type: Type.Uuid },
    ],
    [MessageType.LOBBY_PLAYER_LEAVE]: [],
    [MessageType.LOBBY_SEND_MESSAGE]: [],
    [MessageType.LOBBY_RECEIVE_MESSAGE]: [],
    [MessageType.LOBBY_GAME_CHALLENGE]: [],
    [MessageType.LOBBY_GAME_ACCEPT]: [],
    [MessageType.LOBBY_GAME_REJECT]: [],
    [MessageType.LOBBY_GAME_RESULT]: [],
    [MessageType.LOBBY_DM_SEND]: [],
    [MessageType.LOBBY_DM_RECEIVE]: [],
    [MessageType.GAME_SEARCH]: [],
    [MessageType.GAME_START]: [],
    [MessageType.GAME_QUIT]: [],
    [MessageType.GAME_PLAYER_ONE]: [],
    [MessageType.GAME_PLAYER_TWO]: [],
    [MessageType.GAME_WIN_ONE]: [],
    [MessageType.GAME_WIN_TWO]: [],
    [MessageType.GAME_STALE_MATE]: [],
};

export enum PlayerNumber {
    ONE,
    TWO,
}

export type GridReference = number;

export interface MoveMessageType {
    player: PlayerNumber;
    x: GridReference;
    y: GridReference;
}

export interface SocketMessage<T> {
    type: MessageType;
    payload: T;
}

export interface GameMove {
    type: MessageType;
    player: PlayerNumber;
    x: number;
    y: number;
}
export interface LobbySetUsername {
    type: MessageType.LOBBY_SET_USERNAME;
    username: string;
}
export interface LobbyPlayerJoin {
    type: MessageType.LOBBY_PLAYER_JOIN;
    uuid: string;
    name: string;
}
export interface LobbyPlayerLeave {
    type: MessageType.LOBBY_PLAYER_LEAVE;
    uuid: string;
}
export interface LobbySendMessage {
    type: MessageType.LOBBY_SEND_MESSAGE;
    message: string;
}
export interface LobbyReceiveMessage {
    type: MessageType.LOBBY_RECEIVE_MESSAGE;
    uuid: string;
    message: string;
}
export interface LobbyGameChallenge {
    type: MessageType.LOBBY_GAME_CHALLENGE;
    toUuid: string;
    /**
     * Set by server
     */
    fromUuid?: string;
}
export interface LobbyGameAccept {
    type: MessageType.LOBBY_GAME_ACCEPT;
    gameId: string;
}
export interface LobbyGameReject {
    type: MessageType.LOBBY_GAME_REJECT;
    gameId: string;
}
export interface LobbyGameResult {
    type: MessageType.LOBBY_GAME_RESULT;
    winnerUuid: string;
    loserUuid: string;
}
export interface LobbyDmSend {
    type: MessageType.LOBBY_DM_SEND;
    toUuid: string;
    message: string;
}
export interface LobbyDmReceive {
    type: MessageType.LOBBY_DM_SEND;
    fromUuid: string;
    message: string;
}
export interface GameSearch {
    type: MessageType.GAME_SEARCH;
}
export interface GameStart {
    type: MessageType.GAME_START;
}
export interface GameQuit {
    type: MessageType.GAME_QUIT;
}
export interface GamePlayerOne {
    type: MessageType.GAME_PLAYER_ONE;
}
export interface GamePlayerTwo {
    type: MessageType.GAME_PLAYER_TWO;
}
export interface GameWinOne {
    type: MessageType.GAME_WIN_ONE;
}
export interface GameWinTwo {
    type: MessageType.GAME_WIN_TWO;
}
export interface GameStaleMate {
    type: MessageType.GAME_STALE_MATE;
}
