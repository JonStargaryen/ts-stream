import {streamOf} from "../src/stream";

describe("distinct", () => {
    it("should eliminate duplicate items", () => {
        const result = streamOf(1, 1, 2, 3, 1, 2, 3)
            .distinct()
            .toArray();
        expect(result.length).toBe(3);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);
    });
});