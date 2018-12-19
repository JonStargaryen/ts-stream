import {asStream} from "../src/stream";

describe("allMatch", () => {
    it("should return true as all cases match", () => {
        const input = [1, 2, 3];
        const result: boolean = asStream(input)
            .allMatch(it => Number.isInteger(it));
        expect(result).toBe(true);
    });

    it("should return false as some cases do not match", () => {
        const input = [1, 2, 3];
        const result: boolean = asStream(input)
            .allMatch(it => it > 1);
        expect(result).toBe(false);
    });

    it("should return false as no case does match", () => {
        const input = [1, 2, 3];
        const result: boolean = asStream(input)
            .allMatch(it => it > 4);
        expect(result).toBe(false);
    });
});