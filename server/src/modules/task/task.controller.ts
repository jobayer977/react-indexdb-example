import { Body, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { CreateTaskDTO } from "./request/create-task.dto";

import { Controller } from "@nestjs/common";
import { AppHeaders } from "src/decorators/appHeaders.decorator";
import { User } from "../user/user.entity";
import { FilterTaskDTO } from "./request/filtertask.dto";
import { Task } from "./task.entity";
import { TaskService } from "./task.service";
import { UpdateTaskDTO } from "./request/update-task.dto";

/*
https://docs.nestjs.com/controllers#controllers
*/
@ApiTags("Tasks")
@AppHeaders()
@Controller("/tasks")
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Get()
  async findAll(@Query() options: FilterTaskDTO): Promise<User[]> {
    return this.service.filter(options);
  }

  @Post()
  @ApiBody({ type: CreateTaskDTO })
  async insert(@Body() reqPayloads: CreateTaskDTO): Promise<Task> {
    return this.service.create(reqPayloads);
  }

  @Delete("/:id")
  async delete(@Param("id") id: string): Promise<Task> {
    return this.service.delete(id.trim());
  }

  @Put("/:id")
  @ApiBody({ type: UpdateTaskDTO })
  async update(
    @Param("id") id: string,
    @Body() reqPayloads: UpdateTaskDTO
  ): Promise<any> {
    return this.service.update(id.trim(), reqPayloads);
  }

  @Get("/:id")
  async findById(@Param("id") id: string): Promise<Task> {
    return this.service.findById(id.trim());
  }
}
