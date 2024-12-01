import { Test, TestingModule } from "@nestjs/testing";
import { TagsController } from "./tags.controller";
import { TagsService } from "./tags.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Tag } from "./entities/tag.entity";
import { createMock } from "@golevelup/ts-jest";
import { Repository } from "typeorm";

describe("TagsController", () => {
  const RepositoryMock = createMock<Repository<Tag>>();
  let controller: TagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [
        TagsService,
        {
          provide: getRepositoryToken(Tag),
          useValue: RepositoryMock,
        },
      ],
    }).compile();

    controller = module.get<TagsController>(TagsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
