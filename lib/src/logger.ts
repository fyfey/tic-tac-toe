import { blue, Chalk, red } from 'chalk';

export interface Logger {
    info(...messages: string[]): void;
    error(...messages: string[]): void;
}

export class NullLogger implements Logger {
    info(...messages: string[]) {}
    error(...messages: string[]) {}
}

export class ConsoleLogger implements Logger {
    info(...messages: string[]) {
        this.log(messages, blue, ' INFO');
    }
    error(...message: string[]) {
        this.log(message, red, 'ERROR');
    }
    private log(messages: string[], color: Chalk, label: string) {
        console.log(color(` ${label}`), ...messages);
    }
}
