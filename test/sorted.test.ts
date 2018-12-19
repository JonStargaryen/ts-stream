import {streamOf} from "../src/stream";

describe("sorted", () => {
    it("should sort ", () => {
        const result = streamOf(3, 2, 1, 3, 3, 6, 5)
            .sorted()
            .toArray();

        expect(result.length).toBe(7);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);
        expect(result[3]).toBe(3);
        expect(result[4]).toBe(3);
        expect(result[5]).toBe(5);
        expect(result[6]).toBe(6);
    });
});