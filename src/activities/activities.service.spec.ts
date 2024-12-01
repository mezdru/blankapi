import { Test, TestingModule } from "@nestjs/testing";
import { ActivitiesService } from "./activities.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Activity } from "./entities/activity.entity";
import { Repository } from "typeorm";
import { createMock } from "@golevelup/ts-jest";

describe("ActivitiesService", () => {
  const RepositoryMock = createMock<Repository<Activity>>();
  let service: ActivitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivitiesService,
        {
          provide: getRepositoryToken(Activity),
          useValue: RepositoryMock,
        },
      ],
    }).compile();

    service = module.get<ActivitiesService>(ActivitiesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
