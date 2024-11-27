import { Module } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { AccountsController } from "./accounts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "./entities/account.entity";
import { PicturesModule } from "src/pictures/pictures.module";
import { SubscriptionsModule } from "src/subscriptions/subscriptions.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    PicturesModule,
    SubscriptionsModule,
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
