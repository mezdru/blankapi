import { Test, TestingModule } from "@nestjs/testing";
import { TagsService } from "./tags.service";
import { Tag } from "./entities/tag.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { createMock } from "@golevelup/ts-jest";
import { Repository } from "typeorm";

describe("TagsService", () => {
  const RepositoryMock = createMock<Repository<Tag>>();
  let service: TagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsService,
        {
          provide: getRepositoryToken(Tag),
          useValue: RepositoryMock,
        },
      ],
    }).compile();

    service = module.get<TagsService>(TagsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
