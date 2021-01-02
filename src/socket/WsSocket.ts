import { Observable, Subject } from 'rxjs';
import { Socket } from './socket';
import WebSocket = require('ws');

export class WsSocket implements Socket {
  private Subject = new Subject<Buffer>();
  constructor(private socket: WebSocket) {
    this.socket.on('message', (msg) => this.Subject.next(msg as Buffer));
  }
  send(message: ArrayBuffer): void {
    this.socket.send(message);
  }
  onMessage(): Observable<Buffer> {
    return this.Subject.asObservable();
  }
  close(): void {
    this.socket.close();
  }
  onClose(cb: () => void): void {
    this.socket.on('close', cb);
  }
  removeAllListeners() {
    this.socket.removeAllListeners();
  }
}
