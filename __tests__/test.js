/* eslint-disable no-undef */
const assert = require('assert');
const objKeyFilter = require('../index');
const data = require('./data.json');

data.forEach(({
  filter,
  input,
  name,
  output,
  result,
}) => {
  if (result === 'pass') {
    test(name, async () => {
      expect(() => assert.deepStrictEqual(objKeyFilter(input, filter), output))
        .toBeTruthy();
    });
  } else if (result === 'fail') {
    test(name, async () => {
      expect(() => assert.deepStrictEqual(objKeyFilter(input, filter), output))
        .toThrow();
    });
  } else {
    test(name, async () => {
      expect(() => assert.deepStrictEqual(objKeyFilter(input, filter), output))
        .toThrow();
    });
  }
});
