#!/usr/bin/env node

var util = require('util');

var xhc = require('../');
var colors = require('colors');
var clear = require('clear');

var controllers = xhc.listControllers();

if (!controllers.length) {
  console.error('no controllers found');
  process.exit(1);
}

console.log('%d controllers found, taking first one', controllers.length);

var controller = new xhc.XboxController(controllers[0].path);

clear();
controller.on('values', function(values) {
  clear(false);
  var line = '';
  Object.keys(values).forEach(function(key) {
    var s;
    var val = values[key];
    switch (key) {
      case 'a': s = val ? ' A '.green.inverse : ' A '.green; break;
      case 'x': s = val ? ' X '.cyan.inverse : ' X '.cyan; break;
      case 'y': s = val ? ' Y '.yellow.inverse : ' Y '.yellow; break;
      case 'b': s = val ? ' B '.red.inverse : ' B '.red; break;
      case 'black': s = val ? 'BLACK'.inverse : 'BLACK'; break;
      case 'white': s = val ? 'WHITE'.inverse : 'WHITE'; break;
      case 'start': s = val ? 'START'.inverse : 'START'; break;
      case 'back': s = val ? 'BACK'.inverse : 'BACK'; break;
      case 'up': s = val ? ' ↑ '.inverse : ' ↑ '; break;
      case 'down': s = val ? ' ↓ '.inverse : ' ↓ '; break;
      case 'left': s = val ? ' ← '.inverse : ' ← '; break;
      case 'right': s = val ? ' → '.inverse : ' → '; break;
      case 'las': s = val ? 'LAS'.inverse : 'LAS'; break;
      case 'ras': s = val ? 'RAS'.inverse : 'RAS'; break;
      case 'ltrigger': s = pad(val ? ('LTR='+val).inverse : ('LTR='+val), 7); break;
      case 'rtrigger': s = pad(val ? ('RTR='+val).inverse : ('RTR='+val), 7); break;
      case 'lasX': s = pad((Math.abs(val) > 7000) ? ('lX='+val).inverse : ('lX='+val), 9); break;
      case 'lasY': s = pad((Math.abs(val) > 7000) ? ('lY='+val).inverse : ('lY='+val), 9); break;
      case 'rasX': s = pad((Math.abs(val) > 7000) ? ('rX='+val).inverse : ('rX='+val), 9); break;
      case 'rasY': s = pad((Math.abs(val) > 7000) ? ('rY='+val).inverse : ('rY='+val), 9); break;
    }

    if (s)
      line += util.format('%s ', s);
  });
  console.log(line);
});

function pad(s, p) {
  while (s.stripColors.length < p)
    s += ' ';
  return s;
}
