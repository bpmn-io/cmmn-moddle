'use strict';

var assign = require('lodash/object/assign');

var CmmnModdle = require('./cmmn-moddle');

var packages = {
  cmmn: require('../resources/cmmn/json/cmmn.json'),
  cmmndi: require('../resources/cmmn/json/cmmndi.json'),
  dc: require('../resources/cmmn/json/dc.json'),
  di: require('../resources/cmmn/json/di.json')
};

module.exports = function(additionalPackages, options) {
  return new CmmnModdle(assign({}, packages, additionalPackages), options);
};