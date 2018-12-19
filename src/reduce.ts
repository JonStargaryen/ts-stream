import {Optional} from "./optional";
import {Stream} from "./stream";

export class Reduce {
    reduce<T>(this: Stream<T>, accumulationFunction: (value1: T, value2: T) => T, initialValue?: T): Optional<T> {
        let first, result;
        if(!initialValue) {
            first = this.iterator.next();
            if (first.done) {
                return Optional.empty();
            }
            result = first.value;
        } else {
            result = initialValue;
        }
        for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
            result = accumulationFunction(result, item.value);
        }
        return Optional.of(result);
    }
}