#!/usr/bin/env node

var xhc = require('../');

var controllers = xhc.listControllers();
console.log(controllers);

var controller = new xhc.XboxController(controllers[0].path);
controller.on('values', function(values) {
  console.log(values);
});
