export interface Logger {
    info(...messages: string[]): void;
    error(...messages: string[]): void;
}
export declare class NullLogger implements Logger {
    info(...messages: string[]): void;
    error(...messages: string[]): void;
}
export declare class ConsoleLogger implements Logger {
    info(...messages: string[]): void;
    error(...message: string[]): void;
    private log;
}
