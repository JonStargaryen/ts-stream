import {createStream, Stream} from "./stream";

class SkipIterator<T> implements Iterator<T> {
    private count: number;

    constructor(private readonly iterator: Iterator<T>,
                private readonly skip: number) {
        this.count = 0;
    }

    next(value?: any): IteratorResult<T> {
        for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
            if(this.count < this.skip) {
                this.count++;
            } else {
                return { done: false, value: item.value };
            }
        }
        return { done: true, value: undefined as any };
    }
}

export class Skip {
    skip<T>(this: Stream<T>, skip: number) {
        return createStream(new SkipIterator(this.iterator, skip));
    }
}