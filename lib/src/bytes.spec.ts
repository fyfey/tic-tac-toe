import { readUuid, writeChar, writeInt, writeString, writeUuid } from './bytes';

describe('bytes', () => {
    it('writeInt', () => {
        expect(writeInt(Buffer.alloc(4), 0, 1)[0]).toBe(0x01);
        expect(writeInt(Buffer.alloc(8), 4, 1).toString('hex')).toBe(
            '0000000001000000'
        );
        expect(writeInt(Buffer.alloc(8), 4, 1).toString('hex')).toBe(
            '0000000001000000'
        );
    });
    it('writeChar', () => {
        expect(writeChar(Buffer.alloc(1), 0, 'a')[0]).toBe(0x61);
    });
    it('writeString', () => {
        expect(writeString(Buffer.alloc(3), 0, 'abc').toString('hex')).toBe(
            '616263'
        );
    });
    it('read/writeUUid', () => {
        const input = '43d597d7-2323-325a-90fc-21fa5947b9f3';

        const bytes = writeUuid(Buffer.alloc(16), 0x00, input);
        const decoded = readUuid(bytes, 0x00);

        expect(decoded).toBe(input);
    });
});
