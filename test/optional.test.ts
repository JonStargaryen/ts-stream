import {Optional} from "../src/optional";

describe("optional", () => {
    it("defines behavior of Optional with value present", () => {
        let optional = Optional.of(0);
        expect(optional.get()).toBe(0);
        expect(optional.isPresent()).toBe(true);
        expect(optional.isEmpty()).toBe(false);
        expect(optional.map(it => it + 1).get()).toBe(1);
        let value = 0;
        optional.ifPresent(() => value = 1);
        expect(value).toBe(1);
    });

    it("defines behavior of Optional without value present", () => {
        let optional = Optional.empty();
        expect(() => optional.get()).toThrowError();
        expect(optional.isPresent()).toBe(false);
        expect(optional.isEmpty()).toBe(true);
        expect(optional.map(it => it + 1).isPresent()).toBe(false);
        let value = 0;
        optional.ifPresent(() => value = 1);
        expect(value).toBe(0);
    });
});