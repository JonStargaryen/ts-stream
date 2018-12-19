import {streamOf} from "../src/stream";
import {Optional} from "../src/optional";

describe("findFirst", () => {
    it("should filter and honor sequence streamOf elements", () => {
        const optional: Optional<number> = streamOf(1, 2, 3)
            .filter(it => it > 1)
            .findFirst();

        expect(optional.isPresent()).toBe(true);
        expect(optional.get()).toBe(2);
    });

    it("should return emptyStream optional", () => {
        const optional: Optional<number> = streamOf(1, 2, 3)
            .filter(it => it > 4)
            .findFirst();

        expect(optional.isPresent()).toBe(false);
    });
});