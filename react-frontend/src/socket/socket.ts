import { send } from 'process';

export class Socket {
    ws: WebSocket | undefined;
    subscribers: ((message: MessageEvent<any>) => void)[] = [];
    constructor(private url: string) {}
    connect() {
        this.ws = new WebSocket(this.url);
        this.ws.onmessage = (m: any) => {
            this.subscribers.forEach((s) => s(m));
        };
    }
    send(message: any) {
        if (!this.ws) {
            return;
        }
        this.ws.send(message);
    }
    onMessage(cb: (message: any) => void) {
        this.subscribers.push(cb);
    }
}
