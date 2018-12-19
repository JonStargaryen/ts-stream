import {createStream, Stream} from "./stream";

class MapIterator<S, T> implements Iterator<T> {
    constructor(private readonly map: (item: S) => T,
                private readonly iterator: Iterator<S>) {

    }

    next(value?: any): IteratorResult<T> {
        const item = this.iterator.next();
        return item.done ?
            { done: true, value: undefined as any }:
            { done: false, value: this.map(item.value) };

    }
}

export class Map {
    map<S, T>(this: Stream<T>, map: (item: T) => S): Stream<S> {
        return createStream(new MapIterator(map, this.iterator));
    }
}