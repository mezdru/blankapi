import { Test, TestingModule } from "@nestjs/testing";
import { PicturesService } from "./pictures.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Picture } from "./entities/picture.entity";
import { createMock } from "@golevelup/ts-jest";
import { Repository } from "typeorm";

describe("PicturesService", () => {
  const RepositoryMock = createMock<Repository<Picture>>();
  let service: PicturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PicturesService,
        {
          provide: getRepositoryToken(Picture),
          useValue: RepositoryMock,
        },
      ],
    }).compile();

    service = module.get<PicturesService>(PicturesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
