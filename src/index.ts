import * as fs from 'fs';
import * as QRCode from 'qrcode';
import { ImageData, Manager } from 'escpos-buffer';
import sharp from 'sharp';

export class ImageManager extends Manager {
  loadImage(filename: string): Promise<ImageData> {
    // tslint:disable: non-literal-fs-path
    const data = fs.readFileSync(filename);
    return this.loadImageFromBuffer(data);
  }
  async loadImageFromBuffer(data: Buffer): Promise<ImageData> {
    const image = await sharp(data)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    return {
      width: image.info.width,
      height: image.info.height,
      data: image.data,
    };
  }
  async buildQrcodeImage(data: string, size: number): Promise<ImageData> {
    const buffer = await QRCode.toBuffer(data, { scale: size });
    return this.loadImageFromBuffer(buffer);
  }
}
