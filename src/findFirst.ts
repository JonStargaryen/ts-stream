import {Stream} from "./stream";
import {Optional} from "./optional";

export class FindFirst {
    findFirst<T>(this: Stream<T>): Optional<T> {
        const item = this.iterator.next();
        if(item.done) {
            return Optional.empty();
        } else {
            return Optional.of(item.value);
        }
    }
}