import expect from '../../expect';

import {
  createModdle
} from '../../helper';

import {
  fromFile as readFromFile,
  validate,
  toXML
} from '../../xml-helper';


describe('cmmn-moddle - edit', function() {

  var moddle = createModdle();

  function fromFile(file, done) {
    readFromFile(moddle, file, done);
  }


  describe('save after change', function() {

    it('should serialize changed name', function(done) {

      // given
      fromFile('test/fixtures/cmmn/simple.cmmn', function(err, result) {

        result.cases[0].name = 'OTHER CASE';

        // when
        toXML(result, { format: true }, function(err, xml) {
          expect(xml).to.contain('name="OTHER CASE"');

          done(err);
        });
      });

    });

  });


  describe('open and save', function() {

    it('should valid diagram', function(done) {

      // given
      fromFile('test/fixtures/cmmn/roundtrip.cmmn', function(err, result) {

        if (err) {
          return done(err);
        }

        // when
        toXML(result, { format: true }, function(err, xml) {
          validate(err, xml, done);
        });

      });

    });

  });

});