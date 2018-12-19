import {createStream, Stream} from "./stream";

class FilterIterator<T> implements Iterator<T> {
    constructor(private readonly predicate: (item: T) => boolean,
                private readonly iterator: Iterator<T>) {

    }

    next(value?: any): IteratorResult<T> {
        for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
            if (this.predicate(item.value)) {
                return { done: false, value: item.value };
            }
        }
        return { done: true, value: undefined as any };
    }
}

export class Filter {
    filter<T>(this: Stream<T>, predicate: (item: T) => boolean): Stream<T> {
        return createStream(new FilterIterator(predicate, this.iterator));
    }
}