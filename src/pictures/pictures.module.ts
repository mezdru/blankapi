import { Module } from "@nestjs/common";
import { PicturesService } from "./pictures.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Picture } from "./entities/picture.entity";
import { FilesModule } from "src/files/files.module";

@Module({
  imports: [TypeOrmModule.forFeature([Picture]), FilesModule],
  providers: [PicturesService],
  exports: [PicturesService],
})
export class PicturesModule {}
