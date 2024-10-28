import { Test, TestingModule } from '@nestjs/testing';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { repositoryMockFactory } from 'src/utils/tests/tests.utils';

describe('ActivitiesController', () => {
  let controller: ActivitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivitiesController],
      providers: [
        ActivitiesService,
        {
          provide: getRepositoryToken(Activity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<ActivitiesController>(ActivitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
