import { writeInt, writeString, writeUuid } from '../bytes';
import { PacketMap, SocketMessage, Type } from '../protocol';

export function encode(message: SocketMessage<any>): Buffer {
    if (!(message.type in PacketMap)) {
        throw new Error(`Unsupported message type ${message.type}`);
    }
    const initial = writeInt(Buffer.alloc(4), 0, message.type);
    return PacketMap[message.type].reduce((acc, val, idx) => {
        switch (val.type) {
            case Type.Int:
                return Buffer.concat([
                    acc,
                    writeInt(Buffer.alloc(4), 0, message.payload[val.name]),
                ]);
            case Type.String:
                return Buffer.concat([
                    acc,
                    writeString(
                        Buffer.alloc(message.payload[val.name].length + 1),
                        0,
                        message.payload[val.name]
                    ),
                ]);
            case Type.Uuid:
                return Buffer.concat([
                    acc,
                    writeUuid(Buffer.alloc(16), 0, message.payload[val.name]),
                ]);
        }
    }, initial);
}
