import {streamOf} from "../src/stream";

describe("map", () => {
    it("should map elements", () => {
        const result = streamOf(1, 2, 3)
            .map(it => it * it)
            .toArray();

        expect(result.length).toBe(3);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(4);
        expect(result[2]).toBe(9);
    });
});