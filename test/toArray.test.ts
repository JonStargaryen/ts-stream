import {asStream} from "../src/stream";

describe("toArray", () => {
    it("should return new array", () => {
        const input = [1, 2, 3];
        const array: number[] = asStream(input).toArray();
        expect(input).not.toBe(array);
        expect(array.length).toBe(3);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
    });
});