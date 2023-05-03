import { ImageData, Manager } from 'escpos-buffer';
import * as QRCode from 'qrcode';
import * as fs from 'fs';
import { PNG } from 'pngjs';

export class ImageManager extends Manager {
  loadImage(filename: string): Promise<ImageData> {
    // tslint:disable: non-literal-fs-path
    const data = fs.readFileSync(filename);
    return this.loadImageFromBuffer(data);
  }
  loadImageFromBuffer(data: Buffer): Promise<ImageData> {
    const png = PNG.sync.read(data);
    return Promise.resolve({
      width: png.width,
      height: png.height,
      data: png.data,
    });
  }
  async buildQrcodeImage(data: string, size: number): Promise<ImageData> {
    const buffer = await QRCode.toBuffer(data, { scale: size });
    return this.loadImageFromBuffer(buffer);
  }
}
