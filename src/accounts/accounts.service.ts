import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Account } from "./entities/account.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>
  ) {}

  findOneById(id: string) {
    if (!id) return null;
    return this.accountRepository.findOne({ where: { id } });
  }
}
