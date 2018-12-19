import {Stream} from "./stream";

export class Count {
    count<T>(this: Stream<T>): number {
        let count = 0;
        for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
            // case streamOf emptyStream stream
            if(count === 0 && (item.value as unknown as Array<T>).length === 0) {
                return 0;
            }
            count++;
        }
        return count;
    }
}