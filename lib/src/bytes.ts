export const readChar = (bytes: number, offset: number): string => {
    return String.fromCharCode((bytes >> (offset * 8)) & 0xff);
};
export const writeChar = (
    bytes: number,
    offset: number,
    char: string
): number => {
    return bytes | (char.charCodeAt(0) << (offset * 8));
};
export const readInt = (bytes: number, offset: number): number => {
    return (bytes >> (offset * 8)) & 0xff;
};
export const writeInt = (bytes: number, offset: number, int: number) => {
    return bytes | (int << (offset * 8));
};

export const readString = (bytes: number, offset: number): string => {
    const length = (bytes >> (offset * 8)) & 0xff;
    console.log('LENGTH', length);
    let str = '';
    for (let i = offset + 1; i < length + offset + 1; i++) {
        str += readChar(bytes, i);
    }
    return str;
};
export const writeString = (
    bytes: number,
    offset: number,
    str: string
): number => {
    bytes = writeInt(bytes, offset++, str.length);
    for (let i = 0; i < str.length; i++) {
        bytes = writeChar(bytes, offset + i, str[i]);
    }
    return bytes;
};
export const writeUuid = (
    bytes: number,
    offset: number,
    uuid: string
): number => {
    const b = uuid.replace(/-/g, '');
    for (let i = 0; i < 32; i += 2) {
        bytes |=
            parseInt(b.slice(i, i + 2), 16) << (Math.floor((i + 1) / 2) * 8);
    }
    return bytes;
};
export const readUuid = (bytes: number, offset: number): string => {
    let str = '';
    for (let i = 0; i < 16; i++) {
        str += ((bytes >> (i * 8)) & 0xff).toString(16);
    }
    return str.replace(
        /([0-9A-Fa-f]{8})([0-9A-Fa-f]{4})([0-9A-Fa-f]{4})([0-9A-Fa-f]{4})([0-9A-Fa-f]{12})/g,
        '$1-$2-$3-$4-$5'
    );
};
