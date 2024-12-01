import { createMock } from "@golevelup/ts-jest";
import { Repository } from "typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ActivitiesController } from "./activities.controller";
import { ActivitiesService } from "./activities.service";
import { Activity } from "./entities/activity.entity";

describe("ActivitiesController", () => {
  const RepositoryMock = createMock<Repository<Activity>>();
  let controller: ActivitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivitiesController],
      providers: [
        ActivitiesService,
        {
          provide: getRepositoryToken(Activity),
          useValue: RepositoryMock,
        },
      ],
    }).compile();

    controller = module.get<ActivitiesController>(ActivitiesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
