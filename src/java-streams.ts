export interface IStream<T> {
    // filter(predicateFunction: (value: T) => boolean): IStream<T>;
    // map<R>(mapFunction: (value: T) => R): IStream<R>;
    // mapToNumber(mapFunction: (value: T) => number): INumberStream;
    // flatMapToNumber(mapFunction: (value: T) => INumberStream): INumberStream;
    // distinct(): IStream<T>;
    // sorted(comparatorFunction: (value1: T, value2: T) => number): IStream<T>;
    // peek(consumerFunction: (value: T) => void): IStream<T>;
    // limit(count: number): IStream<T>;
    // skip(count: number): IStream<T>;
    // forEach(consumerFunction: (value: T) => void): void;
    // forEachOrdered(consumerFunction: (value: T) => void): void;
    toArray(): T[];
    // reduce(value: T, accumulationFunction: (value1: T, value2: T) => T): T;
    // reduce(accumulationFunction: (value1: T, value2: T) => T): Optional<T>;
    // reduce<U>(identity: U, accumulatorFunction: (value1: U, value2: T) => U, combinerFunction: (value1: T, value2: T) => T): U;
    // collect<R>(supplierFunction: () => R, accumulatorFunction: (value1: R, value2: T) => void, combinerFunction: (value1: R, value2: R) => void): R;
    // collect<R, A>(collector: Collector<T, A, R>): R;
    // min(comparatorFunction: (value1: T, value2: T) => number): Optional<T>;
    // max(comparatorFunction: (value1: T, value2: T) => number): Optional<T>;
    // count(): number;
    // anyMatch(predicateFunction: (value: T) => boolean): boolean;
    // allMatch(predicateFunction: (value: T) => boolean): boolean;
    // noneMatch(predicateFunction: (value: T) => boolean): boolean;
    // findFirst(): Optional<T>;
    // findAny(): Optional<T>;
}

export class Stream<T> implements IStream<T>, Iterator<T> {
    constructor(readonly iterator: Iterator<T>) {
    }

    static empty<T>(): Stream<T> {
        return Stream.of([]) as any;
    }

    static of<T>(values: T[]): Stream<T> {
        return Stream.asStream(values);
    }

    private static asStream<T>(iterable: Iterable<T>): Stream<T> {
        const iterator = iterable[Symbol.iterator]();
        return Stream.createStream(iterator);
    }

    private static createStream<T>(iterator: Iterator<T>): Stream<T> {
        return new Stream(iterator);
    }

    // filter(predicateFunction: (value: T) => boolean): IStream<T> {
    //     return Stream.createStream(new class extends Stream {
    //         constructor(iterator: Iterator<T>) {
    //             super(iterator);
    //         }
    //
    //         next(value?: any): IteratorResult<T> {
    //             for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
    //                 if(predicateFunction(item)) {
    //                     return { done: false, value: item.value };
    //                 }
    //             }
    //             return { done: true, value: undefined };
    //         }
    //     });
    // }
    //
    // map<R>(mapFunction: (value: T) => R): IStream<R> {
    //     return Stream.createStream(new class extends Stream {
    //         constructor(iterator: Iterator<T>) {
    //             super(iterator);
    //         }
    //
    //         next(value?: any): IteratorResult<T> {
    //             const item = this.iterator.next();
    //             return item.done ? { done: true, value: undefined } : { done: false, value: mapFunction(item.value) };
    //         }
    //     });
    // }

    toArray(): T[] {
        const result: T[] = [];
        for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
            result.push(item.value);
        }
        return result;
    }

    next(value?: any): IteratorResult<T> {
        return { done: true, value: value };
    }


    // static iterate<T>(seed: T, unaryFunction: (value: T) => T): Stream<T>;
    // static generate<T>(supplierFunction: () => T): Stream<T>;
    // static concat<T>(a: Stream<T>, b: Stream<T>): Stream<T>;
}

export interface INumberStream extends IStream<number> {
    mapToObject<R>(mapFunction: (value: number) => R): Stream<R>;
    sum(): number;
    average(): number;
}

// class NumberStream extends Stream<number> implements INumberStream {
//
// }

export interface Collector<T, A, R> {
    supplier(): () => A;
    accumulator(): (value1: A, value2: T) => void;
    combiner(): (value1: A, value2: A) => A;
    finisher(): (value: A) => R;
}

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
        if(this._value) {
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
