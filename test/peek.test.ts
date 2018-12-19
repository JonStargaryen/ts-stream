import {streamOf} from "../src/stream";

describe("peek", () => {
    it("should perform operation without effecting original data", () => {
        const manipulated: number[] = [];
        const original = streamOf(1, 2, 3)
            .peek(it => manipulated.push(it * it))
            .toArray();
        expect(original[0]).toBe(1);
        expect(original[1]).toBe(2);
        expect(original[2]).toBe(3);
        expect(manipulated[0]).toBe(1);
        expect(manipulated[1]).toBe(4);
        expect(manipulated[2]).toBe(9);
    });
});