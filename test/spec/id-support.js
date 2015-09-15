'use strict';

var Helper = require('../helper');

var Ids = require('ids'),
    IdSupport = require('../../lib/id-support');


describe('cmmn-moddle - id-support', function() {

  describe('.extend', function() {

    it('should extend cmmn-moddle with ids', function() {

      // given
      var moddle = Helper.createModdle();
      var ids = new Ids();

      // when
      IdSupport.extend(moddle, ids);

      // then
      expect(moddle.ids).to.equal(ids);
    });

  });


  describe('functionality', function() {

    it('should claim ids during object creation', function() {

      // given
      var moddle = Helper.createModdle();
      var ids = new Ids();

      IdSupport.extend(moddle, ids);

      // when
      var humanTask = moddle.create('cmmn:HumanTask', {
        id: 'HumanTask_1'
      });

      // then
      expect(humanTask.id).to.equal('HumanTask_1');
      expect(moddle.ids.assigned(humanTask.id)).to.equal(humanTask);
    });


    it('should claim ids during object creation', function() {

      // given
      var moddle = Helper.createModdle();
      var ids = new Ids();

      IdSupport.extend(moddle, ids);

      // when
      moddle.create('cmmn:HumanTask', {
        id: 'HumanTask_1'
      });

      // then
      expect(function() {

        moddle.create('cmmn:HumanTask', {
          id: 'HumanTask_1'
        });
      }).to.throw('id <HumanTask_1> already used');
    });


    it('should reset and allow reclaim of ids', function() {

      // given
      var moddle = Helper.createModdle();
      IdSupport.extend(moddle, new Ids());

      moddle.create('cmmn:HumanTask', {
        id: 'HumanTask_1'
      });

      // when
      IdSupport.extend(moddle, new Ids());

      // then
      // expect id to have been reset
      expect(function() {

        moddle.create('cmmn:HumanTask', {
          id: 'HumanTask_1'
        });
      }).not.to.throw();
    });
  });

});