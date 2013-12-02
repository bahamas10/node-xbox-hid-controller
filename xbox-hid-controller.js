var util = require('util');

var HID = require('node-hid');

var D_UP    = 0x01;
var D_DOWN  = 0x02;
var D_LEFT  = 0x04;
var D_RIGHT = 0x08;
var D_START = 0x10;
var D_BACK  = 0x20;
var D_LAS   = 0x40;
var D_RAS   = 0x80;

var BTN_A     = 0x01;
var BTN_B     = 0x01;
var BTN_X     = 0x01;
var BTN_Y     = 0x01;
var BTN_BLACK = 0x01;
var BTN_WHITE = 0x01;

module.exports.listAll = listAll;
module.exports.listControllers = listControllers;
module.exports.XboxController = XboxController;

// list all HID devices
function listAll() {
  return HID.devices();
}

// list only the Xbox Controllers
function listControllers(product) {
  product = product || 'Xbox Controller';

  var devices = listAll();

  var xboxcontrollers = devices.filter(function(dev) {
    return dev.product === product;
  });

  return xboxcontrollers;
}

util.inherits(XboxController, HID.HID);
function XboxController(path) {
  XboxController.super_.apply(this, arguments);
  var self = this;
  this.on('data', function(data) {
    // get buttons
    var d = data[2];
    var a = data[4];
    var b = data[5];
    var x = data[6];
    var y = data[7];
    var bl = data[8];
    var wh = data[9];
    var values = {
      up: bool(d & D_UP),
      down: bool(d & D_DOWN),
      left: bool(d & D_LEFT),
      right: bool(d & D_RIGHT),
      start: bool(d & D_START),
      back: bool(d & D_BACK),
      las: bool(d & D_LAS),
      ras: bool(d & D_RAS),
      a: bool(a & BTN_A),
      b: bool(b & BTN_B),
      x: bool(x & BTN_X),
      y: bool(y & BTN_Y),
      black: bool(bl & BTN_WHITE),
      white: bool(wh & BTN_BLACK),
    };

    // get triggers
    values.ltrigger = data[10];
    values.rtrigger = data[11];

    // analog sticks
    values.lasX = data.readInt16LE(12);
    values.lasY = data.readInt16LE(14);
    values.rasX = data.readInt16LE(16);
    values.rasY = data.readInt16LE(18);

    self.emit('values', values);
  });
}

// return 0 or 1
function bool(val) {
  return val ? 1 : 0;
}
