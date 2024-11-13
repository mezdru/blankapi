import { Test, TestingModule } from "@nestjs/testing";
import { PicturesService } from "./pictures.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Picture } from "./entities/picture.entity";
import { repositoryMockFactory } from "src/utils/tests/tests.utils";

describe("PicturesService", () => {
  let service: PicturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PicturesService,
        {
          provide: getRepositoryToken(Picture),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<PicturesService>(PicturesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
