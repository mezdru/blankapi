import { Test, TestingModule } from "@nestjs/testing";
import { createMock } from "@golevelup/ts-jest";
import { AccountsService } from "./accounts.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Account } from "./entities/account.entity";
import { repositoryMockFactory } from "src/utils/tests/tests.utils";
import { PicturesService } from "src/pictures/pictures.service";
import { SubscriptionsService } from "src/subscriptions/subscriptions.service";

describe("AccountsService", () => {
  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<AccountsService>(AccountsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
