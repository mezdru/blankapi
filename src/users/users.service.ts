import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  findOneByEmail(email: string) {
    try {
      if (!email) return null;
      return this.userRepository.findOne({ where: { email } });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to find user by email");
    }
  }

  findOneById(id: string) {
    try {
      if (!id) return null;
      return this.userRepository.findOne({ where: { id } });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to find user by id");
    }
  }

  createOne(user: CreateUserDto) {
    try {
      return this.userRepository.save({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to create user");
    }
  }
}
