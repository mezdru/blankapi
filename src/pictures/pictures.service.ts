import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Picture } from "./entities/picture.entity";
import { Repository } from "typeorm";

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Picture)
    private pictureRepository: Repository<Picture>
  ) {}

  async uploadPicture(
    picture: Express.Multer.File,
    accountId: string,
    userId: string
  ) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const uploadedPicture = await Promise.resolve(picture); // TODO: bucket

      return this.pictureRepository.save({
        host: "fakehost", // TODO: env var
        path: "fakepath",
        user: { id: userId },
        account: { id: accountId },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to upload picture");
    }
  }
}
