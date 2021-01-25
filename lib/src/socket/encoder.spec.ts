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

        expect(packet.toString('hex')).toBe('00000000000000000300000003000000');
    });
    it('LOBBY_SET_USERNAME', () => {
        const message = {
            type: MessageType.LOBBY_SET_USERNAME,
            payload: {
                name: 'Hi',
            },
        };

        const packet = encode(message);

        expect(packet.toString('hex')).toBe('01000000486900');
    });
    it('LOBBY_PLAYER_JOIN', () => {
        const message = {
            type: MessageType.LOBBY_PLAYER_JOIN,
            payload: {
                name: 'Hi',
                socketId: '43d597d7-2323-325a-90fc-21fa5947b9f3',
            },
        };

        const packet = encode(message);

        expect(packet.toString('hex')).toBe(
            '0200000048690043d597d72323325a90fc21fa5947b9f3'
        );
    });
});
