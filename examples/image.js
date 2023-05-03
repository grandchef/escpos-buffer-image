const path = require('path');
const {
  Printer,
  Align,
  Drawer,
  Model,
  InMemory,
  Image,
} = require('escpos-buffer');

const { ImageManager } = require('../');

(async () => {
  const modelName = 'MP-4200 TH';
  const capability = Model.EXPAND(Model.FIND(modelName));
  const model = new Model(modelName);
  const { feed } = capability;
  const connection = new InMemory();
  const imageManager = new ImageManager();
  const printer = await Printer.CONNECT(model, connection, imageManager);
  await printer.setColumns(48);

  const transparentSampleImageData = await imageManager.loadImage(
    path.join(__dirname, 'transparent_sample.png'),
  );
  const transparentSampleImage = new Image(transparentSampleImageData);
  await printer.writeln('Picture', 0, Align.Center);
  await printer.setAlignment(Align.Center);
  await printer.draw(transparentSampleImage);

  const sampleImageData = await imageManager.loadImage(
    path.join(__dirname, 'sample.png'),
  );
  const sampleImage = new Image(sampleImageData);
  await printer.draw(sampleImage);
  await printer.setAlignment(Align.Left);
  await printer.writeln('End Picture', 0, Align.Center);

  await printer.writeln(`Last Line - Feed: ${feed}`, 0, Align.Center);
  if (feed > 0) {
    await printer.feed(feed);
  }
  await printer.cutter();
  await printer.buzzer();
  await printer.drawer(Drawer.First);
  process.stdout.write(connection.buffer());
})();

// For Unix
//> node examples/image.js | lp -d PRINTER_NAME

// For Windows
//> node examples\image.js > output.bin
//> print /d:\\%COMPUTERNAME%\PRINTER_NAME output.bin
