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
          itemControl: control
        });

        var expectedXML =
          '<cmmn:planItem xmlns:cmmn="http://www.omg.org/spec/CMMN/20151109/MODEL" id="PI_HumanTask_1">' +
             '<cmmn:itemControl />' + 
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

    });

  });
});