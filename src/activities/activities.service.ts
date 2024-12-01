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

  async findOneById(id: string) {
    try {
      if (!id) return null;
      return this.accountRepository.findOne({ where: { id } });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to find activity by id");
    }
  }
}
