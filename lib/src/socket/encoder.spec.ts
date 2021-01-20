import { MessageType, PlayerNumber } from '../protocol';
import { encode } from './encoder';

describe('Encoder', () => {
    it('GAME_MOVE', () => {
        const message = {
            type: MessageType.GAME_MOVE,
            payload: {
                player: PlayerNumber.ONE,
                x: 3,
                y: 3,
            },
        };

        const packet = encode(message);

        expect(packet).toBe(0x3030000);
    });
    it('LOBBY_SET_USERNAME', () => {
        const message = {
            type: MessageType.LOBBY_SET_USERNAME,
            payload: {
                name: 'Hi',
            },
        };

        const packet = encode(message);

        expect(packet).toBe(0x00694801);
    });
    it('LOBBY_PLAYER_JOIN', () => {
        const message = {
            type: MessageType.LOBBY_PLAYER_JOIN,
            payload: {
                name: 'Hi',
                socketId: '',
            },
        };

        const packet = encode(message);

        expect(packet).toBe(0x00694801);
    });
});
