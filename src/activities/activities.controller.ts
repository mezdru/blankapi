import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ActivitiesService } from "./activities.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("activities")
@ApiBearerAuth()
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.activitiesService.findOne(id);
  }
}
