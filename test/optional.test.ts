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

    it("defines behavior of Optional of nullable", () => {
        let nullOptional = Optional.ofNullable(null);
        expect(nullOptional.get()).toBe(null);
        expect(nullOptional.isPresent()).toBe(true);
        expect(nullOptional.isEmpty()).toBe(false);
        expect(nullOptional.map(() => "text").get()).toBe("text");
        let value1 = 0;
        nullOptional.ifPresent(() => value1 = 1);
        expect(value1).toBe(1);

        let undefinedOptional = Optional.ofNullable(undefined);
        expect(() => undefinedOptional.get()).toThrowError();
        expect(undefinedOptional.isPresent()).toBe(false);
        expect(undefinedOptional.isEmpty()).toBe(true);
        expect(undefinedOptional.map(() => "text").isEmpty()).toBe(true);
        let value2 = 0;
        undefinedOptional.ifPresent(() => value2 = 1);
        expect(value2).toBe(0);
    });
});