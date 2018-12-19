import {AllMatch} from "./allMatch";
import {AnyMatch} from "./anyMatch";
import {Count} from "./count";
import {Distinct} from "./distinct";
import {Filter} from "./filter";
import {FlatMap} from "./flatMap";
import {FindFirst} from "./findFirst";
import {ForEach} from "./forEach";
import {Limit} from "./limit";
import {Map} from "./map";
import {NoneMatch} from "./noneMatch";
import {Peek} from "./peek";
import {Reduce} from "./reduce";
import {Skip} from "./skip";
import {Sorted} from "./sorted";
import {ToArray} from "./toArray";
import {ToMap} from "./toMap";

export interface StreamOperations<T> extends AllMatch, AnyMatch, Count, Distinct, Filter, FlatMap, FindFirst, ForEach,
    Limit, Map, NoneMatch, Peek, Reduce, Skip, Sorted, ToArray, ToMap {

}

export interface Stream<T> extends StreamOperations<T> {
    readonly iterator: Iterator<T>;
}

class StreamImpl<T> {
    constructor(readonly iterator: Iterator<T>) {

    }
}

applyMixins(StreamImpl, [AllMatch, AnyMatch, Count, Distinct, Filter, FlatMap, FindFirst, ForEach, Limit, Map,
    NoneMatch, Peek, Reduce, Skip, Sorted, ToArray, ToMap]);

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}

export function emptyStream<T>(): Stream<T> {
    return streamOf() as any;
}

export function streamOf<T>(...values: T[]): Stream<T> {
    return asStream(values);
}

export function asStream<T>(iterable: Iterable<T>): Stream<T> {
    const iterator = iterable[Symbol.iterator]();
    return createStream(iterator);
}

export function createStream<T>(iterator: Iterator<T>): Stream<T> {
    return new StreamImpl(iterator) as any;
}
