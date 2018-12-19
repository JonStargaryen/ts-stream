import {Stream} from "./stream";

export class ToMap {
    toMap<K, V>(this: Stream<[K, V]>): Map<K, V> {
        const map = new Map<K, V>();
        for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
            const [key, value] = item.value;
            map.set(key, value);
        }
        return map;
    }
}