import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { MockType, repositoryMockFactory } from '../utils/tests/tests.utils';
import { CreateUserDto } from './dto/createUser.dto';

describe('UsersService', () => {
  let service: UsersService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repositoryMock: MockType<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repositoryMock = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should call the repository's find method with email", async () => {
    const email = 'email';
    await service.findOneByEmail(email);

    expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { email } });
  });

  it("should call the repository's find method with id", async () => {
    const id = 'id';
    await service.findOneById(id);

    expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { id } });
  });

  it("should call the repository's save method", async () => {
    const userObj: CreateUserDto = {
      email: 'email',
      firstName: 'firstName',
      lastName: 'lastName',
    };

    await service.createOne(userObj);

    expect(repositoryMock.save).toHaveBeenCalledWith(userObj);
  });
});
