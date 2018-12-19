import {Stream} from "./stream";

export class AllMatch {
    allMatch<T>(this: Stream<T>, predicate: (item: T) => boolean): boolean {
        for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
            if (!predicate(item.value)) {
                return false;
            }
        }
        return true;
    }
}