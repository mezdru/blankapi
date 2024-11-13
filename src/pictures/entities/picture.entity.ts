import { Account } from "src/accounts/entities/account.entity";
import { User } from "src/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Picture {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  host: string;

  @Column()
  path: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.pictures)
  user: User;

  @ManyToOne(() => Account, (account) => account.pictures)
  account: Account;
}
