import { Test, TestingModule } from "@nestjs/testing";
import { createMock } from "@golevelup/ts-jest";
import { AccountsService } from "./accounts.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Account } from "./entities/account.entity";
import { PicturesService } from "src/pictures/pictures.service";
import { SubscriptionsService } from "src/subscriptions/subscriptions.service";
import { UsersService } from "src/users/users.service";
import { CreateAccountDto } from "./dto/createAccount.dto";
import { Picture } from "src/pictures/entities/picture.entity";
import { Repository } from "typeorm";
import { mockUser } from "src/users/mocks/user.mock";
import { mockAccount } from "./mocks/account.mock";

describe("AccountsService", () => {
  const PicturesMock = createMock<PicturesService>();
  const SubscriptionsMock = createMock<SubscriptionsService>();
  const UsersMock = createMock<UsersService>();
  const RepositoryMock = createMock<Repository<Account>>();
  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: getRepositoryToken(Account),
          useValue: RepositoryMock,
        },
        {
          provide: PicturesService,
          useValue: PicturesMock,
        },
        {
          provide: SubscriptionsService,
          useValue: SubscriptionsMock,
        },
        {
          provide: UsersService,
          useValue: UsersMock,
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should call the repository's findOne method with id", async () => {
    const id = "id";
    await service.findOneById(id);

    expect(RepositoryMock.findOne).toHaveBeenCalledWith({
      where: { id },
      relations: ["picture"],
    });
  });

  it("should create an account and apply the necessary services", async () => {
    const account: CreateAccountDto = {
      name: "name",
    };

    const picture = new Picture();

    RepositoryMock.save.mockResolvedValue(mockAccount);
    SubscriptionsMock.createCustomer.mockResolvedValue("stripeCustomerId");
    PicturesMock.uploadPicture.mockResolvedValue(picture);
    UsersMock.linkAccount.mockResolvedValue({
      affected: 1,
      raw: [],
      generatedMaps: [],
    });

    await service.createOne(account, mockUser, {} as Express.Multer.File);

    // Initial account creation
    expect(RepositoryMock.save).toHaveBeenNthCalledWith(1, {
      name: "name",
    });

    // Create customer
    expect(SubscriptionsMock.createCustomer).toHaveBeenNthCalledWith(
      1,
      mockAccount,
      mockUser
    );

    // Upload picture
    expect(PicturesMock.uploadPicture).toHaveBeenNthCalledWith(
      1,
      {},
      mockAccount.id,
      mockUser.id
    );

    // Link account to user
    expect(UsersMock.linkAccount).toHaveBeenNthCalledWith(
      1,
      mockUser.id,
      mockAccount.id
    );

    // Update account with picture and stripeCustomerId
    expect(RepositoryMock.createQueryBuilder().update).toHaveBeenNthCalledWith(
      1,
      Account,
      {
        picture,
        stripeCustomerId: "stripeCustomerId",
      }
    );
  });
});
