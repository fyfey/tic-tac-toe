import { writeInt } from '../bytes';
import { MessageType, PlayerNumber } from '../protocol';
import { decode } from './decoder';

describe('Decoder', () => {
    it('decodes a move packet', () => {
        const packet = Buffer.from('00000000000000000300000003000000', 'hex');
        const message = decode(packet);

        expect(message.type).toBe(MessageType.GAME_MOVE);
        expect(message.payload.player).toBe(PlayerNumber.ONE);
        expect(message.payload.x).toBe(3);
        expect(message.payload.y).toBe(3);
    });
    it('decodes a SET_USERNAME packet', () => {
        const packet = Buffer.from('01000000486900', 'hex');

        const message = decode(packet);

        expect(message.type).toBe(MessageType.LOBBY_SET_USERNAME);
        expect(message.payload.name).toBe('Hi');
    });
    it('decodes a LOBBY_PLAYER_JOIN packet', () => {
        const packet = Buffer.from(
            '0200000048690043d597d72323325a90fc21fa5947b9f3',
            'hex'
        );

        const message = decode(packet);

        expect(message.type).toBe(MessageType.LOBBY_PLAYER_JOIN);
        expect(message.payload).toEqual({
            name: 'Hi',
            socketId: '43d597d7-2323-325a-90fc-21fa5947b9f3',
        });
    });
});
