'use strict';

var os = require('os');

var XMLHelper = require('../../xml-helper'),
    Helper = require('../../helper');

var toXML = XMLHelper.toXML;

describe('cmmn-moddle - read', function() {

  var moddle = Helper.createModdle();

  function read(xml, root, opts, callback) {
    return moddle.fromXML(xml, root, opts, callback);
  }

  function fromFile(file, root, opts, callback) {
    var contents = Helper.readFile(file);
    return read(contents, root, opts, callback);
  }


  describe('should import types', function() {

    describe('cmmn', function() {

      it('ExtensionElements', function(done) {

        // when
        fromFile('test/fixtures/cmmn/extension-elements.cmmn', function(err, result) {

          expect(result).to.jsonEqual({
            $type: 'cmmn:Definitions',
            id: 'test',
            targetNamespace: 'http://bpmn.io/schema/cmmn',
            extensionElements: {
              $type : 'cmmn:ExtensionElements',
              values : [
                { $type: 'vendor:info', key: 'bgcolor', value: '#ffffff' },
                { $type: 'vendor:info', key: 'role', value: '[]' }
              ]
            }
          });

          done(err);
        });
      });

      it('Artifacts', function(done) {

        // when
        fromFile('test/fixtures/cmmn/artifacts.cmmn', function(err, result) {

          expect(result.artifacts).to.jsonEqual([
            {
              $type: 'cmmn:TextAnnotation',
              id: 'TextAnnotation_1',
              text: 'This is a text annotation'
            },
            {
              $type: 'cmmn:Association',
              id: 'Association_1'
            },
            {
              $type: 'cmmn:Association',
              id: 'Association_2',
              associationDirection: 'One'
            }
          ]);

          var planItem = result.cases[0].casePlanModel.planItems[0];
          var textAnnotation = result.artifacts[0];
          var association = result.artifacts[1];

          expect(association.sourceRef).to.jsonEqual(planItem);
          expect(association.targetRef).to.jsonEqual(textAnnotation);

          done(err);
        });

      });

    });

    describe('references', function() {

      it('CaseFileItem#targetRefs', function(done) {

        // when
        fromFile('test/fixtures/cmmn/case-file-item-target-refs.cmmn', function(err, result) {

          var caseFileModel = result.cases[0].caseFileModel;

          var caseFileItem1 = caseFileModel.caseFileItems[0];
          var caseFileItem2 = caseFileModel.caseFileItems[1];
          var caseFileItem3 = caseFileModel.caseFileItems[2];

          expect(caseFileItem1.targetRefs[0]).to.jsonEqual(caseFileItem2);
          expect(caseFileItem1.targetRefs[1]).to.jsonEqual(caseFileItem3);

          done(err);
        });
      });

      it('CaseFileItem#sourceRef', function(done) {

        // when
        fromFile('test/fixtures/cmmn/case-file-item-target-refs.cmmn', function(err, result) {

          var caseFileModel = result.cases[0].caseFileModel;

          var caseFileItem1 = caseFileModel.caseFileItems[0];
          var caseFileItem2 = caseFileModel.caseFileItems[1];

          expect(caseFileItem2.sourceRef).to.jsonEqual(caseFileItem1);

          done(err);
        });
      });

    });

  });


  describe('should handle errors', function() {

    it('when importing duplicate ids', function(done) {

      // when
      fromFile('test/fixtures/cmmn/error/duplicate-ids.cmmn', function(err, result, context) {

        var warnings = context.warnings;

        expect(err).not.to.exist;
        expect(warnings.length).to.eql(1);
        expect(warnings[0].message).to.contain('duplicate ID <test>');

        done();
      });
    });

  });

});
