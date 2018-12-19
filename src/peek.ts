import {createStream, Stream} from "./stream";

class PeekIterator<T> implements Iterator<T> {
    constructor(private readonly consumer: (item: T) => void,
                private readonly iterator: Iterator<T>) {

    }

    next(value?: any): IteratorResult<T> {
        for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
            this.consumer(item.value);
            return { done: false, value: item.value };
        }
        return { done: true, value: undefined as any };
    }
}

export class Peek {
    peek<T>(this: Stream<T>, consumer: (item: T) => void): Stream<T> {
        return createStream(new PeekIterator(consumer, this.iterator));
    }
}