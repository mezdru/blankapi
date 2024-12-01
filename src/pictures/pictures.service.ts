import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Picture } from "./entities/picture.entity";
import { Repository } from "typeorm";
import { FilesService } from "src/files/files.service";

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Picture)
    private pictureRepository: Repository<Picture>,
    private filesService: FilesService
  ) {}

  async uploadPicture(
    picture: Express.Multer.File,
    accountId: string,
    userId: string
  ) {
    try {
      const uploadedPicture =
        await this.filesService.uploadFileToBucket(picture);

      return this.pictureRepository.save({
        filename: uploadedPicture.filename,
        host: uploadedPicture.host,
        path: uploadedPicture.path,
        user: { id: userId },
        account: { id: accountId },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to upload picture");
    }
  }
}
