import {
  assign
} from 'min-dash';

import CmmnModdle from './cmmn-moddle';

import CmmnPackage from '../resources/cmmn/json/cmmn.json';
import CmmnDiPackage from '../resources/cmmn/json/cmmndi.json';
import DcPackage from '../resources/cmmn/json/dc.json';
import DiPackage from '../resources/cmmn/json/di.json';

var packages = {
  cmmn: CmmnPackage,
  cmmndi: CmmnDiPackage,
  dc: DcPackage,
  di: DiPackage
};

export default function(additionalPackages, options) {
  var pks = assign({}, packages, additionalPackages);

  return new CmmnModdle(pks, options);
}