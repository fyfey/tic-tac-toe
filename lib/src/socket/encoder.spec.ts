import { MessageType, PlayerNumber } from '../protocol';
import { Encoder } from './encoder';

describe('Encoder', () => {
    let sut: Encoder;
    beforeEach(() => {
        sut = new Encoder();
    });
    it('GAME_MOVE', () => {
        const message = {
            type: MessageType.GAME_MOVE,
            payload: {
                player: PlayerNumber.ONE,
                x: 3,
                y: 3,
            },
        };

        const packet = sut.encode(message);

        expect(packet).toBe(0x3030000);
    });
    it('LOBBY_SET_USERNAME', () => {
        const message = {
            type: MessageType.LOBBY_SET_USERNAME,
            payload: {
                name: 'Hi',
            },
        };

        const packet = sut.encode(message);

        expect(packet).toBe(0x69480201);
    });
});
