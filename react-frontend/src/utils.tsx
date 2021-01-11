export function hex(d: any, padding: number): string {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
        hex = "0" + hex;
    }

    return `0x${hex}`;
}

export function binary(binary: number, width: number): string {
    let bin = binary.toString(2);

    while (bin.length < width) {
        bin = `0${bin}`;
    }
    return bin;
}
export const sleep = (n: number) => new Promise(r => setTimeout(r,n));