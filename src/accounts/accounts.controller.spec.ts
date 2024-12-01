import { Test, TestingModule } from "@nestjs/testing";
import { AccountsController } from "./accounts.controller";
import { AccountsService } from "./accounts.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Account } from "./entities/account.entity";
import { PicturesService } from "src/pictures/pictures.service";
import { createMock } from "@golevelup/ts-jest";
import { SubscriptionsService } from "src/subscriptions/subscriptions.service";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";

describe("AccountsController", () => {
  const RepositoryMock = createMock<Repository<Account>>();
  let controller: AccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [
        AccountsService,
        {
          provide: getRepositoryToken(Account),
          useValue: RepositoryMock,
        },
        {
          provide: PicturesService,
          useValue: createMock<PicturesService>(),
        },
        {
          provide: SubscriptionsService,
          useValue: createMock<SubscriptionsService>(),
        },
        {
          provide: UsersService,
          useValue: createMock<UsersService>(),
        },
      ],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
