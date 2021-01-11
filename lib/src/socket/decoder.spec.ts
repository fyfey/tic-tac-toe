import { MessageType, PlayerNumber } from '../protocol';
import { Decoder } from './decoder';

describe('Decoder', () => {
    let sut: Decoder;
    beforeEach(() => {
        sut = new Decoder();
    });
    it('decodes a move packet', () => {
        const packet = 0x03030000;
        const message = sut.decode(packet);

        expect(message.type).toBe(MessageType.GAME_MOVE);
        expect(message.payload.player).toBe(PlayerNumber.ONE);
        expect(message.payload.x).toBe(3);
        expect(message.payload.y).toBe(3);
    });
    it('decodes a SET_USERNAME packet', () => {
        const packet = 0x69480201;

        const message = sut.decode(packet);

        expect(message.type).toBe(MessageType.LOBBY_SET_USERNAME);
        expect(message.payload.name).toBe('Hi');
    });
});