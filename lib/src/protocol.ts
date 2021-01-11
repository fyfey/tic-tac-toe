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
    payload?: T;
}
