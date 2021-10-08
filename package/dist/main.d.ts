/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
declare const stringify: {
    (value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
    (value: any, replacer?: (string | number)[], space?: string | number): string;
};
declare type InArray<T, X> = T extends readonly [X, ...infer _Rest] ? true : T extends readonly [X] ? true : T extends readonly [infer _, ...infer Rest] ? InArray<Rest, X> : false;
declare type UniqueArray<T> = T extends readonly [infer X, ...infer Rest] ? InArray<Rest, X> extends true ? ['Encountered value with duplicates: ', X] : readonly [X, ...UniqueArray<Rest>] : T;
declare type TKeyObject<K> = {
    path: K[];
    lookInsideArrays: boolean;
};
declare type TKeysToFilter<K> = (K | UniqueArray<K> | TKeyObject<K>)[];
declare type TKeyTrack<K> = K[];
declare type PrimitiveType = string | number | boolean | Object | ((...params: any[]) => any);
declare type TJSON = {
    [key: string]: PrimitiveType | PrimitiveType[] | TJSON | TJSON[];
};
declare type TFilterInput = TJSON | TJSON[];
declare function doKeysMatch<K>(keysToFilter: TKeysToFilter<K>, key: K, keyTrack: TKeyTrack<K>): any;
/**
 * Filter / Remove keys from an object | array recursively.
 *
 * @param {Object|Array} object  object | array to filter the keys from
 * @param {Array} keysToFilter  array of keys to filter
 * @return {Object}  object same as input but without the specified keys
 */
declare function filter<T extends TFilterInput, K extends keyof T>(object: T | T[], keysToFilter?: TKeysToFilter<K>, keyTrack?: TKeyTrack<K>): Partial<T>;
