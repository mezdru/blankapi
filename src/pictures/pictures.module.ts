import { Module } from "@nestjs/common";
import { PicturesService } from "./pictures.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Picture } from "./entities/picture.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Picture])],
  providers: [PicturesService],
})
export class PicturesModule {}
