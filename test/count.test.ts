import {asStream, emptyStream, streamOf} from "../src/stream";

describe("count", () => {
    it("should report count 3", () => {
        const input = [1, 2, 3];
        const result: number = asStream(input)
            .count();
        expect(result).toBe(3);
    });

    it("should report count 0 for emptyStream array", () => {
        const input: number[] = [];
        const result: number = asStream(input)
            .count();
        expect(result).toBe(0);
    });

    it("should report count 0 on emptyStream stream", () => {
        const result: number = emptyStream()
            .count();
        expect(result).toBe(0);
    });


    it("should evaluate predicate and count results", () => {
        const num = streamOf(1, 2, 3)
            .filter(it => it > 1)
            .count();
        expect(num).toBe(2);
    });
});