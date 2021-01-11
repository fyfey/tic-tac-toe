export interface Uuid {
    create(): string;
}
export declare class RandomHexUuid implements Uuid {
    create(): string;
}
