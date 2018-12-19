import {createStream, Stream} from "./stream";

export class DistinctIterator<T> implements Iterator<T> {
    private items: T[];

    constructor(private readonly iterator: Iterator<T>) {
        this.items = [];
    }

    next(value?: any): IteratorResult<T> {
        for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
            if(this.items.indexOf(item.value) === -1) {
                this.items.push(item.value);
                return { done: false, value: item.value };
            }
        }
        return { done: true, value: undefined as any };
    }
}

export class Distinct {
    distinct<T>(this: Stream<T>): Stream<T> {
        return createStream(new DistinctIterator(this.iterator));
    }
}