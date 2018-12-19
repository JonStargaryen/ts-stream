import {streamOf} from "../src/stream";

describe("forEach", () => {
    it("should perform terminal, consuming operation for all elements", () => {
        const array: number[] = [];
        streamOf(1, 2, 3)
            .forEach(it => array.push(it));
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
    });
});