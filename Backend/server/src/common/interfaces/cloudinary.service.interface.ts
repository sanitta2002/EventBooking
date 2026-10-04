export interface ICloudinaryService {
  uploadImage(file: {
    buffer: Buffer;
    mimetype: string;
  }): Promise<string>;
}