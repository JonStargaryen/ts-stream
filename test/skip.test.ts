import {streamOf} from "../src/stream";

describe("skip", () => {
    it("should limit length streamOf stream by skipping some elements", () => {
        const result = streamOf(1, 2, 3, 4)
            .skip(2)
            .toArray();

        expect(result.length).toBe(2);
        expect(result[0]).toBe(3);
        expect(result[1]).toBe(4);
    });
});