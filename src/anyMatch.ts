import {Stream} from "./stream";

export class AnyMatch {
    anyMatch<T>(this: Stream<T>, predicate: (item: T) => boolean): boolean {
        for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
            if (predicate(item.value)) {
                return true;
            }
        }
        return false;
    }
}