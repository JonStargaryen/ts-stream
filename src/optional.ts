export class Optional<T> {
    private static readonly EMPTY: Optional<any> = new Optional();
    private readonly _value: T | undefined;

    constructor(value?: T) {
        this._value = value;
    }

    static empty(): Optional<any> {
        return this.EMPTY;
    }

    static of<T>(value: T): Optional<T> {
        return new Optional<T>(value);
    }

    static ofNullable<T>(value: T | undefined): Optional<T> {
        return value !== undefined ? this.of(value) : this.EMPTY;
    }

    get(): T {
        if(this._value !== undefined) {
            return this._value;
        }
        throw new Error("NoSuchElementException");
    }

    isPresent(): boolean {
        return this._value !== undefined;
    }

    ifPresent(consumerFunction: (value: T) => void) {
        if(this._value !== undefined) {
            consumerFunction(this._value);
        }
    }

    isEmpty(): boolean {
        return this._value === undefined;
    }

    filter(predicateFunction: (value: T) => boolean): Optional<T> {
        if(this._value !== undefined) {
            return predicateFunction(this._value) ? this : Optional.EMPTY;
        }
        return this;
    }

    map<R>(mapFunction: (value: T) => R): Optional<R> {
        return this._value !== undefined ? new Optional<R>(mapFunction(this._value)) : Optional.EMPTY;
    };

    flatMap<R>(mapFunction: (value: T) => Optional<R>): Optional<R> {
        if(this._value !== undefined) {
            return mapFunction(this._value);
        } else {
            return Optional.empty();
        }
    }

    orElse(alternativeValue: T): T {
        return this._value !== undefined ? this._value : alternativeValue;
    }

    orElseGet(supplierFunction: () => T): T {
        return this._value !== undefined ? this._value : supplierFunction();
    }

    orElseThrow(supplierFunction: () => Error): T {
        if(this._value !== undefined) {
            return this._value;
        }
        throw supplierFunction();
    }
}