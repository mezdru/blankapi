import { Test, TestingModule } from "@nestjs/testing";
import { AccountsController } from "./accounts.controller";
import { AccountsService } from "./accounts.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Account } from "./entities/account.entity";
import { repositoryMockFactory } from "src/utils/tests/tests.utils";

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
      ],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
