import {createStream, Stream} from "./stream";

class LimitIterator<T> implements Iterator<T> {
    private count: number;

    constructor(private readonly iterator: Iterator<T>,
                private readonly limit: number) {
        this.count = 0;
    }

    next(value?: any): IteratorResult<T> {
        for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
            if(this.count < this.limit) {
                this.count++;
                return { done: false, value: item.value };
            }
        }
        return { done: true, value: undefined as any };
    }
}

export class Limit {
    limit<T>(this: Stream<T>, limit: number) {
        return createStream(new LimitIterator(this.iterator, limit));
    }
}