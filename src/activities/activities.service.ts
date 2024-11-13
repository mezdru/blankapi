import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Activity } from "./entities/activity.entity";
import { Repository } from "typeorm";

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private accountRepository: Repository<Activity>
  ) {}

  async findOne(id: string): Promise<Activity> {
    if (!id) return null;
    return this.accountRepository.findOne({ where: { id } });
  }
}
