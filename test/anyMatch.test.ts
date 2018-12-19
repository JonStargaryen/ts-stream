import {asStream} from "../src/stream";

describe("anyMatch", () => {
    it("should return true as all cases match", () => {
        const input = [1, 2, 3];
        const result: boolean = asStream(input)
            .anyMatch(it => Number.isInteger(it));
        expect(result).toBe(true);
    });

    it("should return true as some cases do match", () => {
        const input = [1, 2, 3];
        const result: boolean = asStream(input)
            .anyMatch(it => it > 1);
        expect(result).toBe(true);
    });

    it("should return false as no case does match", () => {
        const input = [1, 2, 3];
        const result: boolean = asStream(input)
            .anyMatch(it => it > 4);
        expect(result).toBe(false);
    });
});