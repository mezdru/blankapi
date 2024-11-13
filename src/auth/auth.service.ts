import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RegisterUserDto } from "./dto/auth.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload, {
      secret: process.env.NEST_JWT_SECRET,
    });
  }

  async login(user) {
    if (!user) {
      throw new BadRequestException("Unauthenticated");
    }

    const userExists = await this.usersService.findOneByEmail(user.email);

    if (!userExists) {
      return this.registerUser(user);
    }

    return this.generateJwt({
      sub: userExists.id,
      email: userExists.email,
    });
  }

  async registerUser(user: RegisterUserDto) {
    try {
      const newUser = await this.usersService.createOne(user);

      return this.generateJwt({
        sub: newUser.id,
        email: newUser.email,
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
