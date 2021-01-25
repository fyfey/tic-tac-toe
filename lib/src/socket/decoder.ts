import { Buffer } from 'buffer';
import { readInt, readString, readUuid } from '../bytes';
import { PacketMap, SocketMessage, Type } from '../protocol';

export function decode(message: Buffer): SocketMessage<any> {
    let offset = 4;
    return {
        type: readInt(message, 0),
        payload: PacketMap[readInt(message, 0)].reduce((acc, val, idx) => {
            switch (val.type) {
                case Type.Int:
                    const i = readInt(message, offset);
                    offset += 4;
                    return {
                        ...acc,
                        [val.name]: i,
                    };
                case Type.String:
                    const str = readString(message, offset);
                    offset += str.length + 1;
                    return {
                        ...acc,
                        [val.name]: str,
                    };
                case Type.Uuid:
                    const uuid = readUuid(message, offset);
                    offset += 16;
                    return {
                        ...acc,
                        [val.name]: uuid,
                    };
            }
        }, {}),
    };
}
