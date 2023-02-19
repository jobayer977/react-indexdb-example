import { CreateTaskDTO } from "./request/create-task.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Body, Get, Post, Query } from "@nestjs/common";

import { AppHeaders } from "src/decorators/appHeaders.decorator";
import { Controller } from "@nestjs/common";
import { CreateUserDTO } from "../user/requests/create-user.request";
import { User } from "../user/user.entity";
import { Task } from "./task.entity";
import { TaskService } from "./task.service";
import { BaseFilterRequestDTO } from "src/base/base.request";

/*
https://docs.nestjs.com/controllers#controllers
*/
@ApiTags("Tasks")
@AppHeaders()
@Controller("/tasks")
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Get()
  async findAll(@Query() options: BaseFilterRequestDTO): Promise<User[]> {
    return this.service.filter(options);
  }

  @Post()
  @ApiBody({ type: CreateTaskDTO })
  async insert(@Body() reqPayloads: CreateTaskDTO): Promise<Task> {
    return this.service.create(reqPayloads);
  }
}
