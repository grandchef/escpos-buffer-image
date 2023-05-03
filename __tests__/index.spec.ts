import * as path from 'path';
import * as fs from 'fs';

import { load } from './helper';

import { ImageManager } from '../src';

const loadImageDataByFilename = async (
  filename: string,
  fromBuffer: boolean = false,
) => {
  const imageManager = new ImageManager();

  const imagePath = path.join(__dirname, `resources/${filename}`);

  if (fromBuffer) {
    // tslint:disable: non-literal-fs-path
    const imageBuffer = fs.readFileSync(imagePath);
    return await imageManager.loadImageFromBuffer(imageBuffer);
  }

  return await imageManager.loadImage(imagePath);
};

describe('load picture image and build qrcode image', () => {
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

  it('load picture image data from file in PNG', async () => {
    const imageData = await loadImageDataByFilename('sample.png');

    expect(imageData.width).toEqual(180);
    expect(imageData.height).toEqual(215);
    expect(imageData.data).toStrictEqual(
      load('sample_png_image_data', imageData.data),
    );
  });

  it('load picture image data from buffer in PNG', async () => {
    const imageData = await loadImageDataByFilename('sample.png', true);

    expect(imageData.width).toEqual(180);
    expect(imageData.height).toEqual(215);
    expect(imageData.data).toStrictEqual(
      load('sample_png_image_data', imageData.data),
    );
  });

  it('load picture image data from file in JPG', async () => {
    const imageData = await loadImageDataByFilename('sample.jpg');

    expect(imageData.width).toEqual(180);
    expect(imageData.height).toEqual(215);
    expect(imageData.data).toStrictEqual(
      load('sample_jpg_image_data', imageData.data),
    );
  });

  it('load picture image data from buffer in JPG', async () => {
    const imageData = await loadImageDataByFilename('sample.jpg', true);

    expect(imageData.width).toEqual(180);
    expect(imageData.height).toEqual(215);
    expect(imageData.data).toStrictEqual(
      load('sample_jpg_image_data', imageData.data),
    );
  });

  it('load picture image data from file in WebP', async () => {
    const imageData = await loadImageDataByFilename('sample.webp');

    expect(imageData.width).toEqual(180);
    expect(imageData.height).toEqual(215);
    expect(imageData.data).toStrictEqual(
      load('sample_webp_image_data', imageData.data),
    );
  });

  it('load picture image data from buffer in WebP', async () => {
    const imageData = await loadImageDataByFilename('sample.webp', true);

    expect(imageData.width).toEqual(180);
    expect(imageData.height).toEqual(215);
    expect(imageData.data).toStrictEqual(
      load('sample_webp_image_data', imageData.data),
    );
  });
});
