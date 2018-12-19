import {createStream, Stream} from "./stream";

class FlatMapIterator<S, T> implements Iterator<T> {
    private current: Iterator<T> | undefined;

    constructor(private readonly map: (item: S) => Stream<T>,
                private readonly iterator: Iterator<S>) {

    }

    next(value?: any): IteratorResult<T> {
        if (this.current != null) {
            const item = this.current.next();
            if (!item.done) {
                return item;
            }
        }

        const next = this.iterator.next();
        if (!next.done) {
            const stream = this.map(next.value);
            this.current = stream.iterator;
            return this.next();
        }

        return { done: true, value: undefined as any };
    }
}

export class FlatMap {
    flatMap<S, T>(this: Stream<S>, map: (value: S) => Stream<T>): Stream<T> {
        return createStream(new FlatMapIterator(map, this.iterator));
    }
}