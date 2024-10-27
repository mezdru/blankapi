import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  findOneById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  createOne(user: CreateUserDto) {
    return this.userRepository.save({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }
}
