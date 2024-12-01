import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Account } from "./entities/account.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateAccountDto } from "./dto/createAccount.dto";
import { PicturesService } from "src/pictures/pictures.service";
import { SubscriptionsService } from "src/subscriptions/subscriptions.service";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private readonly picturesService: PicturesService,
    private readonly subscriptionsService: SubscriptionsService,
    private readonly usersService: UsersService
  ) {}

  findOneById(id: string) {
    try {
      if (!id) return null;

      return this.accountRepository.findOne({
        where: { id },
        relations: ["picture"],
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to find account by id");
    }
  }

  async createOne(
    account: CreateAccountDto,
    user: User,
    picture?: Express.Multer.File
  ) {
    try {
      const createdAccount = await this.accountRepository.save({
        name: account.name,
      });

      const stripeCustomerId = await this.subscriptionsService.createCustomer(
        createdAccount,
        user
      );

      const uploadedPicture = picture
        ? await this.picturesService.uploadPicture(
            picture,
            createdAccount.id,
            user.id
          )
        : undefined;

      await this.usersService.linkAccount(user.id, createdAccount.id);

      // Allows us to update the entity and return the resulting entity
      return (
        await this.accountRepository
          .createQueryBuilder()
          .update(Account, {
            picture: uploadedPicture,
            stripeCustomerId: stripeCustomerId,
          })
          .where({ id: createdAccount.id })
          .returning("*")
          .updateEntity(true)
          .execute()
      ).raw[0];
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Failed to create account");
    }
  }
}
