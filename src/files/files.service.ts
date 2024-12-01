import { Storage } from "@google-cloud/storage";
import { Injectable } from "@nestjs/common";
import { UploadedFileDto } from "./dto/uploadedFile.dto";

@Injectable()
export class FilesService {
  private storage: Storage;
  private bucketName: string;

  constructor() {
    this.storage = new Storage();
    this.bucketName = process.env.GCP_STORAGE_BUCKET_NAME ?? "";
  }

  // TODO: file metadata with account and user ?
  async uploadFileToBucket(
    file: Express.Multer.File
  ): Promise<UploadedFileDto> {
    const bucket = this.storage.bucket(this.bucketName);
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
      gzip: true,
      contentType: file.mimetype,
    });

    return new Promise((resolve, reject) => {
      blobStream.on("error", (err) => {
        reject(err);
      });

      blobStream.on("finish", () => {
        resolve({
          host: process.env.GCP_STORAGE_HOST ?? "",
          path: `/${this.bucketName}/${blob.name}`,
          filename: file.originalname,
        });
      });

      blobStream.end(file.buffer);
    });
  }
}
