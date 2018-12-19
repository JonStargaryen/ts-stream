import {streamOf} from "../src/stream";

describe("limit", () => {
    it("should limit length streamOf stream by selecting first elements", () => {
        const result = streamOf(1, 2, 3, 4)
            .limit(2)
            .toArray();

        expect(result.length).toBe(2);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
    });
});