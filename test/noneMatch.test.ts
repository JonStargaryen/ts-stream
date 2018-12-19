import {streamOf} from "../src/stream";

describe("noneMatch", () => {
    it("should never match and return true", () => {
        const result = streamOf(1, 2, 3)
            .noneMatch(it => it > 3);
        expect(result).toBe(true);
    });

    it("should match occasionally and return false", () => {
        const result = streamOf(1, 2, 3)
            .noneMatch(it => it > 1);
        expect(result).toBe(false);
    });
});