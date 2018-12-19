import {asStream, streamOf} from "../src/stream";

describe("flatMap", () => {
    it("should flatten array", () => {
        const result = streamOf(1, 2)
            .flatMap(it => streamOf(1, 2)
                .map(jt => it * jt))
            .toArray();

        expect(result.length).toBe(4);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(2);
        expect(result[3]).toBe(4);
    });

    it("should flatten element arrays", () => {
        const array = streamOf([1, 2], [3, 4], [5, 6])
            .flatMap(it => asStream(it))
            .toArray();

        expect(array.length).toBe(6);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);
        expect(array[5]).toBe(6);
    });
});