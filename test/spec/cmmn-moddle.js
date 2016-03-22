'use strict';

var Helper = require('../helper');

var moddle = Helper.createModdle();


describe('cmmn-moddle', function() {


  describe('parsing', function() {

    it('should publish type', function() {
      // when
      var type = moddle.getType('cmmn:Case');

      // then
      expect(type).to.exist;
      expect(type.$descriptor).to.exist;
    });

  });


  describe('creation', function() {

    it('should create ProcessTask', function() {
      var processTask = moddle.create('cmmn:ProcessTask');

      expect(processTask.$type).to.eql('cmmn:ProcessTask');
    });


    it('should create Definitions', function() {
      var definitions = moddle.create('cmmn:Definitions');

      expect(definitions.$type).to.eql('cmmn:Definitions');
    });


    it('should create Case', function() {
      var _case = moddle.create('cmmn:Case');

      expect(_case.$type).to.eql('cmmn:Case');
      expect(_case.$instanceOf('cmmn:CMMNElement')).to.be.true;
    });


    it('should create Association', function() {
      var association = moddle.create('cmmn:Association');

      expect(association.$type).to.eql('cmmn:Association');
      expect(association.$instanceOf('cmmn:CMMNElement')).to.be.true;
    });


    it('should create TextAnnotation', function() {
      var textAnnotation = moddle.create('cmmn:TextAnnotation');

      expect(textAnnotation.$type).to.eql('cmmn:TextAnnotation');
      expect(textAnnotation.$instanceOf('cmmn:CMMNElement')).to.be.true;
    });


    describe('defaults', function() {

      it('should init CaseFileItem', function() {
        var caseFileItem = moddle.create('cmmn:CaseFileItem');

        expect(caseFileItem.multiplicity).to.eql('Unspecified');
      });


      it('should init CaseFileItemDefinition', function() {
        var caseFileItemDefinition = moddle.create('cmmn:CaseFileItemDefinition');

        expect(caseFileItemDefinition.definitionType).to.eql('http://www.omg.org/spec/CMMN/DefinitionType/Unspecified');
      });


      it('should init Definitions', function() {
        var definitions = moddle.create('cmmn:Definitions');

        expect(definitions.expressionLanguage).to.eql('http://www.w3.org/1999/XPath');
      });      


      it('should init Process', function() {
        var process = moddle.create('cmmn:Process');

        expect(process.implementationType).to.eql('http://www.omg.org/spec/CMMN/ProcessType/Unspecified');
      });        


      it('should init Property', function() {
        var property = moddle.create('cmmn:Property');

        expect(property.type).to.eql('http://www.omg.org/spec/CMMN/PropertyType/Unspecified');
      });        


      it('should init Task', function() {
        var task = moddle.create('cmmn:Task');

        expect(task.isBlocking).to.eql(true);
      });  


      it('should init Documentation', function() {
        var documentation = moddle.create('cmmn:Documentation');

        expect(documentation.textFormat).to.eql('text/plain');
      });  

    });

  });


  describe('property access', function() {

    describe('singleton properties', function() {

      it('should set attribute', function() {

        // given
        var _case = moddle.create('cmmn:Case');

        // assume
        expect(_case.get('name')).not.to.exist;

        // when
        _case.set('name', 'My Case');

        // then
        expect(_case).to.jsonEqual({
          $type: 'cmmn:Case',
          name: 'My Case'
        });
      });


      it('should set attribute (ns)', function() {

        // given
        var _case = moddle.create('cmmn:Case');

        // assume
        expect(_case.get('cmmn:name')).not.to.exist;

        // when
        _case.set('cmmn:name', 'My Case');

        // then
        expect(_case).to.jsonEqual({
          $type: 'cmmn:Case',
          name: 'My Case'
        });
      });


      it('should set id attribute', function() {

        // given
        var definitions = moddle.create('cmmn:Definitions');

        // when
        definitions.set('id', 10);

        // then
        expect(definitions).to.jsonEqual({
          $type: 'cmmn:Definitions',
          id: 10
        });
      });
    });


    describe('builder', function() {

      it('should create simple hierarchy', function() {

        // given
        var definitions = moddle.create('cmmn:Definitions');
        var caseElements = definitions.get('cmmn:cases');

        var _case1 = moddle.create('cmmn:Case');
        var _case2 = moddle.create('cmmn:Case');

        // when
        caseElements.push(_case1);
        caseElements.push(_case2);

        // then
        expect(caseElements).to.eql([ _case1, _case2 ]);
        expect(definitions.cases).to.eql([ _case1, _case2 ]);

        expect(definitions).to.jsonEqual({
          $type: 'cmmn:Definitions',
          cases: [
            { $type: 'cmmn:Case' },
            { $type: 'cmmn:Case' }
          ]
        });
      });

    });
  });
});