import { Test, TestingModule } from "@nestjs/testing";
import { AccountsController } from "./accounts.controller";
import { AccountsService } from "./accounts.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Account } from "./entities/account.entity";
import { repositoryMockFactory } from "src/utils/tests/tests.utils";
import { PicturesService } from "src/pictures/pictures.service";
import { createMock } from "@golevelup/ts-jest";
import { SubscriptionsService } from "src/subscriptions/subscriptions.service";

describe("AccountsController", () => {
  let controller: AccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [
        AccountsService,
        {
          provide: getRepositoryToken(Account),
          useFactory: repositoryMockFactory,
        },
        {
          provide: PicturesService,
          useValue: createMock<PicturesService>(),
        },
        {
          provide: SubscriptionsService,
          useValue: createMock<SubscriptionsService>(),
        },
      ],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
