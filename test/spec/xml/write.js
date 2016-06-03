'use strict';

var assign = require('lodash/object/assign'),
    isFunction = require('lodash/lang/isFunction');

var Helper = require('../../helper');



describe('cmmn-moddle - write', function() {

  var moddle = Helper.createModdle();


  function write(element, options, callback) {
    if (isFunction(options)) {
      callback = options;
      options = {};
    }

    // skip preamble for tests
    options = assign({ preamble: false }, options);

    moddle.toXML(element, options, callback);
  }


  describe('should export types', function() {

    describe('cmmn', function() {

      it('PlanItemDefinition#DefaultControl', function(done) {

        // given
        var control = moddle.create('cmmn:PlanItemControl');
        var humanTask = moddle.create('cmmn:HumanTask', {
          id: 'HumanTask_1',
          defaultControl: control
        });

        var expectedXML =
          '<cmmn:humanTask xmlns:cmmn="http://www.omg.org/spec/CMMN/20151109/MODEL" id="HumanTask_1">' +
             '<cmmn:defaultControl />' + 
          '</cmmn:humanTask>';

        // when
        write(humanTask, function(err, result) {

          // then
          expect(result).to.eql(expectedXML);

          done(err);
        });
      });

      it('PlanItem#ItemControl', function(done) {

        // given
        var control = moddle.create('cmmn:PlanItemControl');
        var planItem = moddle.create('cmmn:PlanItem', {
          id: 'PI_HumanTask_1',
          itemControl: control,
          entryCriteria: [
            moddle.create('cmmn:EntryCriterion')
          ],
          exitCriteria: [
            moddle.create('cmmn:ExitCriterion')
          ]
        });

        var expectedXML =
          '<cmmn:planItem xmlns:cmmn="http://www.omg.org/spec/CMMN/20151109/MODEL" id="PI_HumanTask_1">' +
             '<cmmn:itemControl />' + 
             '<cmmn:entryCriterion />' +
             '<cmmn:exitCriterion />' +
          '</cmmn:planItem>';

        // when
        write(planItem, function(err, result) {

          // then
          expect(result).to.eql(expectedXML);

          done(err);
        });
      });

      it('DiscretionaryItem#ItemControl', function(done) {

        // given
        var control = moddle.create('cmmn:PlanItemControl');
        var discretionaryItem = moddle.create('cmmn:DiscretionaryItem', {
          id: 'PI_HumanTask_1',
          itemControl: control
        });

        var expectedXML =
          '<cmmn:discretionaryItem xmlns:cmmn="http://www.omg.org/spec/CMMN/20151109/MODEL" id="PI_HumanTask_1">' +
             '<cmmn:itemControl />' + 
          '</cmmn:discretionaryItem>';

        // when
        write(discretionaryItem, function(err, result) {

          // then
          expect(result).to.eql(expectedXML);

          done(err);
        });
      });


      it('Definitions', function(done) {

        // given
        var planItem = moddle.create('cmmn:PlanItem', {
          id: 'PlanItem_1'
        });

        var textAnnotation = moddle.create('cmmn:TextAnnotation', {
          id: 'TextAnnotation_1',
          text: 'FOOBAR'
        });

        var definitionsElement = moddle.create('cmmn:Definitions', {
          cases: [
            moddle.create('cmmn:Case', {
              casePlanModel: moddle.create('cmmn:Stage', {
                planItems: [
                  planItem
                ]
              })
            })
          ],
          artifacts: [
            textAnnotation,
            moddle.create('cmmn:Association', {
              id: 'Association_1',
              sourceRef: planItem,
              targetRef: textAnnotation
            }),
            moddle.create('cmmn:Association', {
              id: 'Association_2',
              associationDirection: 'One',
            })
          ]
        });

        var expectedXML =
          '<cmmn:definitions xmlns:cmmn="http://www.omg.org/spec/CMMN/20151109/MODEL">' +
             '<cmmn:case>' +
               '<cmmn:casePlanModel>' +
                 '<cmmn:planItem id="PlanItem_1" />' +
               '</cmmn:casePlanModel>' +
             '</cmmn:case>' +
             '<cmmn:textAnnotation id="TextAnnotation_1">' +
               '<cmmn:text>FOOBAR</cmmn:text>' +
             '</cmmn:textAnnotation>' +
             '<cmmn:association id="Association_1" sourceRef="PlanItem_1" targetRef="TextAnnotation_1" />' +
             '<cmmn:association id="Association_2" associationDirection="One" />' +
          '</cmmn:definitions>';

        // when
        write(definitionsElement, function(err, result) {

          // then
          expect(result).to.eql(expectedXML);

          done(err);
        });
      });

    });

  });
});