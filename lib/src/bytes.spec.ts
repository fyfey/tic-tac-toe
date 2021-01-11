import { readUuid, writeChar, writeInt, writeString, writeUuid } from './bytes';

describe('bytes', () => {
    it('writeInt', () => {
        expect(writeInt(0x00, 0, 1)).toBe(0x01);
        expect(writeInt(0x00, 1, 1)).toBe(0x0100);
        expect(writeInt(0x01, 1, 1)).toBe(0x0101);
    });
    it('writeChar', () => {
        expect(writeChar(0x00, 0, 'a')).toBe(0x61);
    });
    it('writeString', () => {
        expect(writeString(0x00, 0, 'abc')).toBe(0x63626103);
    });
    it('read/writeUUid', () => {
        const input = '43d597d7-2323-325a-90fc-21fa5947b9f3';

        const bytes = writeUuid(0x00, 0x00, input);
        const decoded = readUuid(bytes, 0x00);

        expect(decoded).toBe(input);
    });
});
