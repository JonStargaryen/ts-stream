import {streamOf} from "../src/stream";

describe("reduce", () => {
    it("should sum numbers", () => {
        let result = streamOf(1, 2, 3, 4)
            .reduce((l, r) => l + r)
            .get();
        expect(result).toBe(10);
    });

    it("should retrieve min element", () => {
        let result = streamOf(1, 2, 3, 4)
            .reduce((l, r) => l < r ? l : r)
            .get();
        expect(result).toBe(1);
    });

    it("should concat elements", () => {
        let result = streamOf(1, 2, 3)
            .map(it => String(it))
            .reduce((l, r) => String(l) + ", " + String(r), "")
            .get();
        expect(result).toBe("1, 2, 3")
    })
});