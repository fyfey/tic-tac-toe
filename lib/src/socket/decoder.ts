import { readInt, readString } from '../bytes';
import {
    MessageType,
    PacketMap,
    PlayerNumber,
    SocketMessage,
    Type,
} from '../protocol';

export class Decoder {
    decode(message: number): SocketMessage<any> {
        return {
            type: message & 0xff,
            payload: PacketMap[message & 0xff].reduce((acc, val, idx) => {
                switch (val.type) {
                    case Type.Int:
                        return {
                            ...acc,
                            [val.name]: readInt(message, idx + 1),
                        };
                    case Type.String:
                        return {
                            ...acc,
                            [val.name]: readString(message, idx + 1),
                        };
                }
            }, {}),
        };
    }
}
