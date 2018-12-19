import {Stream} from "./stream";

export class ToArray {
    toArray<T>(this: Stream<T>): T[] {
        const result: T[] = [];
        for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
            result.push(item.value);
        }
        return result;
    }
}