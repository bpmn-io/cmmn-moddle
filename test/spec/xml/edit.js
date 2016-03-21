'use strict';

var XMLHelper = require('../../xml-helper'),
    Helper = require('../../helper');

var toXML = XMLHelper.toXML;


describe('cmmn-moddle - edit', function() {

  var moddle = Helper.createModdle();

  function fromFile(file, done) {
    XMLHelper.fromFile(moddle, file, done);
  }


  describe('save after change', function() {

    it('should serialize changed name', function(done) {

      // given
      fromFile('test/fixtures/cmmn/simple.cmmn', function(err, result) {
        if (err) {
          return done(err);
        }

        result.cases[0].name = 'OTHER CASE';

        // when
        toXML(result, { format: true }, function(err, xml) {
          expect(xml).to.contain('name="OTHER CASE"');

          done(err);
        });
      });

    });

  });

});