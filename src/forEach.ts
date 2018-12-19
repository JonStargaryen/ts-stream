import {Stream} from "./stream";

export class ForEach {
    forEach<T>(this: Stream<T>, consumer: (item: T) => void) {
        for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
            consumer(item.value);
        }
    }
}