import { writeInt, writeString } from '../bytes';
import { PacketMap, SocketMessage, Type } from '../protocol';

export class Encoder {
    encode(message: SocketMessage<any>): number {
        if (!(message.type in PacketMap)) {
            throw new Error(`Unsupported message type ${message.type}`);
        }
        return PacketMap[message.type].reduce((acc, val, idx) => {
            switch (val.type) {
                case Type.Int:
                    acc = writeInt(acc, idx + 1, message.payload[val.name]);

                    return acc;
                case Type.String:
                    acc = writeString(acc, idx + 1, message.payload[val.name]);

                    return acc;
            }
        }, message.type as number);
    }
}
