[![Latest Version][version-badge]][npm-link]
[![Build Status][github-badge]][github-ci]
[![TypeScript version][ts-badge]][typescript-49]
[![Node.js version][nodejs-badge]][nodejs]
[![MIT][license-badge]][license]

# escpos-buffer-image

Library to provide image support for escpos-buffer

Image type supported:

- PNG

## Install

Run command bellow on your project folder

```sh
yarn add escpos-buffer escpos-buffer-image
```

or

```sh
npm install escpos-buffer escpos-buffer-image
```

## Setup

### Node

```js
const { Printer, InMemory } = require('escpos-buffer');
const { ImageManager } = require('escpos-buffer-image');

const connection = new InMemory();
const imageManager = new ImageManager();
const printer = await Printer.CONNECT('MP-4200 TH', connection, imageManager);
```

### Browser

Use the WebUSB protocol [in Chrome](https://caniuse.com/webusb) to connect directly to the printer.

```js
import { Printer, Model, WebUSB } from 'escpos-buffer';
import { ImageManager } from 'escpos-buffer-image';

const device = await navigator.usb.requestDevice({
  filters: [
    {
      vendorId: VENDOR_ID,
    },
  ],
});
const connection = new WebUSB(device);
const imageManager = new ImageManager();
const printer = await Printer.CONNECT('TM-T20', connection, imageManager);
```

## Usage

```js
const { Image } = require('escpos-buffer');

// Following setup above...
await printer.setColumns(48);
const imageData = await imageManager.loadImage('IMAGE PATH');
const image = new Image(imageData);
await printer.draw(image);
if (feed > 0) {
  await printer.feed(feed);
}
await printer.cutter();
await printer.buzzer();
await printer.drawer(Drawer.First);

// For buffered connection (output to stdout)
process.stdout.write(connection.buffer());

// to print, run command bellow on terminal

// For Unix
//> node examples/image.js | lp -d PRINTER_NAME

// For Windows
//> node examples\image.js > output.bin
//> print /d:\\%COMPUTERNAME%\PRINTER_NAME output.bin
```

## Available scripts

- `clean` - remove coverage data, Jest cache and transpiled files,
- `build` - transpile TypeScript to ES6,
- `build:watch` - interactive watch mode to automatically transpile source files,
- `lint` - lint source files and tests,
- `style:fix` - fix prettier style problems,
- `style:check` - check for prettier style,
- `test` - run tests,
- `test:watch` - interactive watch mode to automatically re-run tests
- `test:debug` - run tests debugging

## License

Licensed under the MIT. See the [LICENSE](https://github.com/grandchef/escpos-buffer-image/blob/master/LICENSE) file for details.

[ts-badge]: https://img.shields.io/badge/TypeScript-4.9-blue.svg
[typescript-49]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html
[nodejs-badge]: https://img.shields.io/badge/Node.js-%3E=%2014-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v14.x/docs/api/
[github-badge]: https://github.com/grandchef/escpos-buffer-image/actions/workflows/main.yml/badge.svg
[github-ci]: https://github.com/grandchef/escpos-buffer-image/actions
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: https://github.com/grandchef/escpos-buffer-image/blob/master/LICENSE
[version-badge]: https://img.shields.io/npm/v/escpos-buffer-image?label=escpos-buffer-image
[npm-link]: https://www.npmjs.com/package/escpos-buffer-image
