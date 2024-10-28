import { Tag } from 'src/tags/entities/tag.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ActivityType {
  ACTIVITY = 'ACTIVITY',
  EVENT = 'EVENT',
  TASK = 'TASK',
}

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ActivityType,
    default: ActivityType.ACTIVITY,
  })
  type: ActivityType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  startAt: Date;

  @Column()
  endAt: Date;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @Column({ default: true })
  isActive: boolean;
}
