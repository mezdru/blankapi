import { Injectable } from "@nestjs/common";
import { Tag } from "./entities/tag.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private accountRepository: Repository<Tag>
  ) {}
}
