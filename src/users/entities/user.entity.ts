import { Account } from "src/accounts/entities/account.entity";
import { Picture } from "src/pictures/entities/picture.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  email: string;

  @OneToOne(() => Account)
  account?: Account;

  @OneToOne(() => Picture)
  picture?: Picture;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Picture, (picture) => picture.user)
  pictures: Picture[];
}
