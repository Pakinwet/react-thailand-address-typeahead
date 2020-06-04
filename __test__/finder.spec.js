'use strict';

var finder = require('../finder');

describe('Address finder test', function () {
  it('should able to parse JSON to JQL object', function () {
    var result = finder.resolveResultbyField('a', 'บาง');
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return result correctly and include searchStr in target field', function () {
    var result = finder.resolveResultbyField('p', 'นคร');
    var matching = expect.stringMatching(/นคร/);
    var i = Math.round(Math.random() * result.length);
    expect(result[i].p).toEqual(matching);
  });
});