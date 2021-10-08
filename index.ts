// const { stringify } = JSON;

// type InArray<T, X> =
//   // eslint-disable-next-line no-unused-vars
//   T extends readonly [X, ...infer _Rest]
//   ? true
//   : T extends readonly [X]
//   ? true
//   // eslint-disable-next-line no-unused-vars
//   : T extends readonly [infer _, ...infer Rest]
//   ? InArray<Rest, X>
//   : false

// type UniqueArray<T> =
//   T extends readonly [infer X, ...infer Rest]
//   ? InArray<Rest, X> extends true
//   ? ['Encountered value with duplicates: ', X]
//   : readonly [X, ...UniqueArray<Rest>]
//   : T

// type TKeyObject<K> = {
//   path: K[];
//   lookInsideArrays: boolean;
// };

// type TKeysToFilter<K> = (K | UniqueArray<K> | TKeyObject<K>)[];

// type TKeyTrack<K> = K[];

// type PrimitiveType =
//   // eslint-disable-next-line no-unused-vars
//   string | number | boolean | Object | ((...params: any[]) => any);

// type TJSON = {
//   [key: string]: PrimitiveType | PrimitiveType[] | TJSON | TJSON[]
// };

// type TFilterInput = TJSON | TJSON[];

// function doKeysMatch<K>(
//   keysToFilter: TKeysToFilter<K>,
//   key: K,
//   keyTrack: TKeyTrack<K>,
// ): any {
//   // eslint-disable-next-line no-bitwise
//   return ~keysToFilter.findIndex((fKey) => {
//     if ((typeof fKey === 'object')) {
//       let path: K[];
//       let lookInsideArrays: boolean;

//       if (!Array.isArray(fKey)) {
//         path = (fKey as TKeyObject<K>).path;
//         lookInsideArrays = (fKey as TKeyObject<K>).lookInsideArrays;
//       } else {
//         path = fKey;
//         lookInsideArrays = false;
//       }

//       return stringify(
//         [...keyTrack, key]
//           .filter((k) => (lookInsideArrays ? (typeof k === 'string') : true))
//           .slice(-1 * ((path.length > 1) ? path.length : 1)),
//       ) === stringify(path);
//     }

//     return (fKey === key);
//   });
// }

// /**
//  * Filter / Remove keys from an object | array recursively.
//  *
//  * @param {Object|Array} object  object | array to filter the keys from
//  * @param {Array} keysToFilter  array of keys to filter
//  * @return {Object}  object same as input but without the specified keys
//  */
// function filter<T extends TFilterInput, K extends keyof T>(
//   object: T | T[],
//   keysToFilter: TKeysToFilter<K> = [],
//   keyTrack: TKeyTrack<K> = [],
// ): Partial<T> {
//   if (typeof object !== 'object') {
//     throw new TypeError(`
//       The parameter "object" is of type ${typeof object}. It must be an object.
//     `);
//   }

//   if (!Array.isArray(keysToFilter)) {
//     throw new TypeError('The parameter "keysToFilter" must be an array.');
//   }

//   const resultObj: any = Array.isArray(object) ? [] : {};

//   Object.keys(object).forEach((key) => {
//     if (doKeysMatch(keysToFilter, key as K, keyTrack)) {
//       return;
//     }

//     resultObj[key] = (object[key] != null)
//       && (typeof object[key] === 'object')
//       && Object.keys(object[key]).length
//       ? filter(
//         object[key],
//         keysToFilter as TKeysToFilter<K>,
//         [
//           ...keyTrack,
//           Array.isArray(object) ? parseInt(key.toString(), 10) : key,
//         ],
//       )
//       : object[key];
//   });

//   return resultObj;
// }

// console.log(JSON.stringify(
//   filter({
//     name: 'obj-key-filter',
//     version: '1.0.0',
//     description: 'node.js',
//     main: 'dist/index.js',
//     scripts: {
//       build: 'tsc index.ts --outDir dist && node build.js',
//       test: 'jest',
//     },
//     repository: {
//       type: 'git',
//       url: 'git+https://github.com/naveen-bharathi/node-obj-key-filter.git',
//     },
//     keywords: [
//       'obj-key-filter',
//       'obj key filter',
//       'object-key-filter',
//       'object key filter',
//       'object',
//       'obj',
//       'key',
//       'filter',
//       'recursive',
//     ],
//     author: {
//       email: 'naveen@naveenbharathi.com',
//       name: 'Naveen Bharathi',
//     },
//     license: 'MIT',
//     bugs: {
//       url: 'https://github.com/naveen-bharathi/node-obj-key-filter/issues',
//     },
//     homepage: 'https://github.com/naveen-bharathi/node-obj-key-filter#readme',
//     devDependencies: {
//       '@babel/core': '^7.15.4',
//       '@babel/preset-env': '^7.15.4',
//       '@babel/preset-typescript': '^7.15.0',
//       '@typescript-eslint/eslint-plugin': '^4.29.2',
//       '@typescript-eslint/parser': '^4.29.2',
//       'babel-jest': '^27.1.0',
//       eslint: '^7.32.0',
//       'eslint-config-airbnb-base': '^14.2.1',
//       'eslint-plugin-import': '^2.24.1',
//       jest: '^27.0.6',
//       shelljs: '^0.8.4',
//     },
//     files: [
//       'dist/index.js',
//     ],
//   }, [
//     'author',
//     'bugs',
//     { path: ['description', 'bugs'], lookInsideArrays: true },
//   ]),
//   null,
//   2,
// ));

// module.exports = filter;
