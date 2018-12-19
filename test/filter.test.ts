import {streamOf} from "../src/stream";

describe("filter", () => {
    it("should filter elements", () => {
        const result = streamOf(1, 2, 3)
            .filter(it => it > 1)
            .toArray();

        expect(result.length).toBe(2);
        expect(result[0]).toBe(2);
        expect(result[1]).toBe(3);
    });
});