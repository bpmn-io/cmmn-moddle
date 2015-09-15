'use strict';

var Builder = require('./builder');


function makeStringRef(desc) {
  desc.type = 'String';
  delete desc.isReference;
}

// BE AWARE: EXECUTING THIS TEST OVERWRITES THE EXISTING cmmn.json!

describe.skip('moddle CMMN 1.1 json', function() {

  describe('generate simple model', function() {

    it('transform CMMN11.cmof', function(done) {

      var builder = new Builder();

      builder.parse('resources/cmmn/cmof/CMMN10.cmof', function(pkg, cmof) {

        builder.cleanIDs();
        builder.cleanAssociations();

        // remove associations
        pkg.associations = [];

        pkg.xml = {
          tagAlias: 'lowerCase',
          typePrefix: 't'
        };

        delete pkg.URI;

        pkg.uri = 'http://www.omg.org/spec/CMMN/20150516/MODEL';
        pkg.prefix = 'cmmn';

        builder.exportTo('resources/cmmn/json/cmmn.json');
      }, done);

    });

  });

});
