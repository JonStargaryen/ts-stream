import {asStream} from "../src/stream";

describe("toMap", () => {
    it("should return items as new map", () => {
        const key1 = {k: 1};
        const key2 = {k: 2};
        const key3 = {k: 3};
        const array: Array<[object, string]> = [[key1, "a"], [key2, "b"], [key3, "c"]];
        const map = asStream(array)
            .toMap();
        expect(map.size).toBe(3);
        expect(map.get(key1)).toBe("a");
        expect(map.get(key2)).toBe("b");
        expect(map.get(key3)).toBe("c");
    });
});