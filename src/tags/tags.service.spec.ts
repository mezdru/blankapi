import { Test, TestingModule } from "@nestjs/testing";
import { TagsService } from "./tags.service";
import { Tag } from "./entities/tag.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { repositoryMockFactory } from "src/utils/tests/tests.utils";

describe("TagsService", () => {
  let service: TagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsService,
        {
          provide: getRepositoryToken(Tag),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<TagsService>(TagsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
