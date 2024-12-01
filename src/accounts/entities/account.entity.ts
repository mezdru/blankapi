import { Picture } from "src/pictures/entities/picture.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Picture)
  @JoinColumn()
  picture?: Picture;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Picture, (picture) => picture.account)
  pictures: Picture[];

  @Column({ nullable: true })
  stripeCustomerId?: string;
}
