'use strict';

var JQL = require('jqljs');

var fieldsEnum = {
  DISTRICT: 'd',
  AMPHOE: 'a',
  PROVINCE: 'p',
  ZIPCODE: 'z'
};

/**
 * From jquery.Thailand.js line 30 - 128
 * Search result by FieldsType
 */
var preprocess = function preprocess(data) {
  if (!data[0].length) {
    // non-compacted database
    return data;
  }
  // compacted database in hierarchical form of:
  // [["province",[["amphur",[["district",["zip"...]]...]]...]]...]
  var expanded = [];
  data.forEach(function (provinceEntry) {
    var province = provinceEntry[0];
    var amphurList = provinceEntry[1];
    amphurList.forEach(function (amphurEntry) {
      var amphur = amphurEntry[0];
      var districtList = amphurEntry[1];
      districtList.forEach(function (districtEntry) {
        var district = districtEntry[0];
        var zipCodeList = districtEntry[1];
        zipCodeList.forEach(function (zipCode) {
          expanded.push({
            d: district,
            a: amphur,
            p: province,
            z: zipCode
          });
        });
      });
    });
  });
  return expanded;
};
var DB = new JQL(preprocess(require('../data.json')));

var resolveResultbyField = function resolveResultbyField(type, searchStr) {
  var possibles = [];
  try {
    possibles = DB.select('*').where(type).match('^' + searchStr).orderBy(type).fetch();
  } catch (e) {
    return [];
  }
  return possibles;
};

exports.resolveResultbyField = resolveResultbyField;
exports.fieldsEnum = fieldsEnum;