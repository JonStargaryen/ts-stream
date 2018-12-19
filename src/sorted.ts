import {createStream, Stream} from "./stream";

export class Sorted {
    sorted<T>(this: Stream<T>): Stream<T> {
        const result: T[] = [];
        for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
            result.push(item.value);
        }
        result.sort();
        const iterator = result[Symbol.iterator]();
        return createStream(iterator);
    }
}