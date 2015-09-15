# cmmn-moddle

[![Build Status](https://travis-ci.org/bpmn-io/cmmn-moddle.svg)](https://travis-ci.org/bpmn-io/cmmn-moddle)

Read and write CMMN 1.1 diagram files in NodeJS and the browser.

__cmmn-moddle__ uses the [CMMN 1.1 meta-model](http://www.omg.org/spec/CMMN/) to validate the input and produce correct CMMN 1.1 XML. The library is built on top of [moddle](https://github.com/bpmn-io/moddle) and [moddle-xml](https://github.com/bpmn-io/moddle-xml).


## Usage

Get the library via [npm package](https://www.npmjs.org/package/cmmn-moddle). Bundle it for the web using [browserify](http://browserify.org) or [webpack](https://webpack.github.io).

```javascript
var CmmnModdle = require('cmmn-moddle');

var moddle = new CmmnModdle();

var xmlStr =
  '<?xml version="1.0" encoding="UTF-8"?>' +
  '<cmmn:definitions xmlns:cmmn="http://www.omg.org/spec/CMMN/20150516/MODEL" id="empty-definitions" targetNamespace="http://bpmn.io/schema/cmmn">' +
  '</cmmn:definitions>';


moddle.fromXML(xmlStr, function(err, definitions) {

  // update id attribute
  definitions.set('id', 'NEW ID');

  // add a root element
  var cmmnCase = moddle.create('cmmn:Case', { id: 'MyCase_1' });
  definitions.get('cases').push(cmmnCase);

  moddle.toXML(definitions, function(err, xmlStrUpdated) {

    // xmlStrUpdated contains new id and the added process

  });

});
```


## Resources

*   [Issues](https://github.com/bpmn-io/cmmn-moddle/issues)
*   [Examples](https://github.com/bpmn-io/cmmn-moddle/tree/master/test/spec/xml)


## Building the Project

You need [grunt](http://gruntjs.com) to build the project.

To run the test suite that includes XSD schema validation you must have a Java JDK installed and properly exposed through the `JAVA_HOME` variable.

Execute the test via

```
grunt test
```

Perform a complete build of the application via

```
grunt
```


## License

Use under the terms of the [MIT license](http://opensource.org/licenses/MIT).