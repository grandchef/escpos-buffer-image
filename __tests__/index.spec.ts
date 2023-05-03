import * as path from 'path';
import * as fs from 'fs';

import { load } from './helper';

import { ImageManager } from '../src';

describe('print formatted text', () => {
  it('draw qrcode', async () => {
    const imageManager = new ImageManager();

    const imageData = await imageManager.buildQrcodeImage(
      'https://github.com/grandchef/escpos-buffer-image',
      4,
    );

    expect(imageData.width).toEqual(164);
    expect(imageData.height).toEqual(164);
    expect(imageData.data).toStrictEqual(
      load('sample_qrcode_data', imageData.data),
    );
  });

  it('load picture image data from file', async () => {
    const imageManager = new ImageManager();

    const imagePath = path.join(__dirname, 'resources/sample.png');
    const imageData = await imageManager.loadImage(imagePath);

    expect(imageData.width).toEqual(180);
    expect(imageData.height).toEqual(215);
    expect(imageData.data).toStrictEqual(
      load('sample_image_data', imageData.data),
    );
  });

  it('load picture image data from buffer', async () => {
    const imageManager = new ImageManager();

    const imagePath = path.join(__dirname, 'resources/sample.png');
    // tslint:disable: non-literal-fs-path
    const imageBuffer = fs.readFileSync(imagePath);
    const imageData = await imageManager.loadImageFromBuffer(imageBuffer);

    expect(imageData.width).toEqual(180);
    expect(imageData.height).toEqual(215);
    expect(imageData.data).toStrictEqual(
      load('sample_image_data', imageData.data),
    );
  });
});
