Xbox HID Controller
===================

Original Xbox Controller API using
[node-hid](https://github.com/node-hid/node-hid) HID device

Usage
-----

First, you require the module, and run `listControllers` to get
a list of HID devices that look like on Original Xbox Controller.
The array returned is a filtered version of `HID.devices()` from the
[node-hid](https://github.com/node-hid/node-hid) module.

Then, you create an `XboxController` object, which is a subclass of
`HID.HID`, and subscribe to the `values` event emitted.  Events
will be emitted whenever the state of the controller changes.

``` js
var xhc = require('xbox-hid-controller');

var controllers = xhc.listControllers();
console.log(controllers);

var controller = new xhc.XboxController(controllers[0].path);
controller.on('values', function(values) {
  console.log(values);
});
```

```
[ { vendorId: 1118,
    productId: 645,
    path: 'USB_045e_0285_fd121000',
    serialNumber: '',
    manufacturer: 'Unknown Third-Party',
    product: 'Xbox Controller',
    release: 256,
    interface: -1 } ]
{ up: 0,
  down: 0,
  left: 0,
  right: 0,
  start: 0,
  back: 0,
  las: 0,
  ras: 0,
  a: 0,
  b: 0,
  x: 0,
  y: 0,
  black: 0,
  white: 0,
  ltrigger: 0,
  rtrigger: 0,
  lasX: 896,
  lasY: -1228,
  rasX: 0,
  rasY: 413 }
{ up: 0,
  down: 0,
  left: 0,
  right: 0,
  start: 0,
  back: 0,
  las: 0,
  ras: 0,
  a: 0,
  b: 0,
  x: 0,
  y: 0,
  black: 0,
  white: 0,
  ltrigger: 0,
  rtrigger: 0,
  lasX: 1344,
  lasY: -1228,
  rasX: 0,
  rasY: 413 }
...
```

API
---

### `xhc.listControllers([product])`

List all HID devices that look like Xbox Controllers.

- `product`: the name to use to filter the list of HID devices, defaults to `Xbox Controller`

### `xhc.listAll()`

List all HID devices.  Same as `HID.devices()`

### `new XboxController(path)`

Create a new `XboxController` object that emits `values` events whenever
the controllers state is changed.

- Event `vaules`: emitted whenever the controllers state is changed, contains information
about the buttons pressed and axis moved

Because this class is a subclass of `HID.HID` from
[node-hid](https://github.com/node-hid/node-hid), you can also subscribe
to the events emitted directly by this object.

- Event `error`: any possible error with the HID device
- Event `data`: the raw data buffer from the device, this is parsed for you
and emitted in a nicer form with the `values` event

Installation
------------

    npm install xbox-hid-controller

To use the tools in the [examples/](/examples) directory, you must
install the dev dependencies from npm

    git clone git://github.com/bahamas10/node-xbox-hid-controller.git
    cd node-xbox-hid-controller
    npm install
    npm install -d

Mac OS X
--------

You must first installed this driver http://xhd.sourceforge.net/ for the
original Xbox controller to be recognized by OS X.

If you are running Mountain Lion, Mavericks, or above, you need to download
this version of the driver specifically for it to work
http://macman860.wordpress.com/2013/05/03/xbox-driver-for-mac-os-x-lion/

License
-------

MIT
