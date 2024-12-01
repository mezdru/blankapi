import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import { createMock } from "@golevelup/ts-jest";

describe("UsersService", () => {
  const RepositoryMock = createMock<Repository<User>>();
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: RepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should call the repository's find method with email", async () => {
    const email = "email";
    await service.findOneByEmail(email);

    expect(RepositoryMock.findOne).toHaveBeenCalledWith({ where: { email } });
  });

  it("should call the repository's find method with id", async () => {
    const id = "id";
    await service.findOneById(id);

    expect(RepositoryMock.findOne).toHaveBeenCalledWith({ where: { id } });
  });

  it("should call the repository's save method", async () => {
    const userObj: CreateUserDto = {
      email: "email",
      firstName: "firstName",
      lastName: "lastName",
    };

    await service.createOne(userObj);

    expect(RepositoryMock.save).toHaveBeenCalledWith(userObj);
  });
});
