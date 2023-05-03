const { Printer, Align, Model, InMemory } = require('escpos-buffer');

const { ImageManager } = require('../');

(async () => {
  const model = new Model('PrintiD');
  const connection = new InMemory();
  const imageManager = new ImageManager();
  const printer = await Printer.CONNECT(model, connection, imageManager);
  await printer.setAlignment(Align.Center);
  await printer.qrcode('https://github.com/grandchef/escpos-buffer');
  await printer.setAlignment(Align.Left);
  await printer.buzzer();
  await printer.cutter();
  process.stdout.write(connection.buffer());
})();

// For Unix
//> node examples/qrcode.js | lp -d PRINTER_NAME

// For Windows
//> node examples\qrcode.js > output.bin
//> print /d:\\%COMPUTERNAME%\PRINTER_NAME output.bin
