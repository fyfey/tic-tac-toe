import { Buffer } from 'buffer';

export const readChar = (bytes: Buffer, offset: number): string => {
    return String.fromCharCode(readByte(bytes, offset));
};
export const readByte = (bytes: Buffer, offset: number): number => {
    return bytes[offset];
};
export const writeByte = (
    bytes: Buffer,
    offset: number,
    byte: number
): Buffer => {
    bytes[offset] = byte;
    return bytes;
};
export const writeChar = (
    bytes: Buffer,
    offset: number,
    char: string
): Buffer => {
    bytes[offset] = char.charCodeAt(0);
    return bytes;
};
export const readInt = (bytes: Buffer, offset: number): number => {
    return bytes.readUInt32LE(offset);
};
export const writeInt = (bytes: Buffer, offset: number, int: number) => {
    bytes.writeUInt32LE(int, offset);
    return bytes;
};

export const readString = (bytes: Buffer, offset: number): string => {
    let str = '';
    for (let i = offset; true; i++) {
        if (readByte(bytes, i) === 0x00) {
            break;
        }
        str += readChar(bytes, i);
    }
    return str;
};
export const writeString = (
    bytes: Buffer,
    offset: number,
    str: string
): Buffer => {
    let i = 0;
    for (; i < str.length; i++) {
        bytes = writeChar(bytes, offset + i, str[i]);
    }
    bytes = writeByte(bytes, offset + i + 1, 0x00);
    return bytes;
};
export const writeUuid = (
    bytes: Buffer,
    offset: number,
    uuid: string
): Buffer => {
    const b = uuid.replace(/-/g, '');
    for (let i = 0; i < 32; i += 2) {
        bytes.write(b.slice(i, i + 2), Math.floor((offset + i + 1) / 2), 'hex');
    }
    return bytes;
};
export const readUuid = (bytes: Buffer, offset: number): string => {
    let str = bytes.toString('hex', offset, offset + 16);
    return str.replace(
        /([0-9A-Fa-f]{8})([0-9A-Fa-f]{4})([0-9A-Fa-f]{4})([0-9A-Fa-f]{4})([0-9A-Fa-f]{12})/g,
        '$1-$2-$3-$4-$5'
    );
};
