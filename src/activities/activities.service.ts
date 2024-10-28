import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private accountRepository: Repository<Activity>,
  ) {}
}
