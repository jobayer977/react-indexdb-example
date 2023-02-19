import { Module } from "@nestjs/common";
import { Sector } from "./sectors.entity";
import { SectorsController } from "./sectors.controller";
import { SectorsService } from "./sectors.service";
import { Task } from "./task.entity";
import { TaskController } from "./task.controller";
import { TaskSector } from "./taskSector.entity";
import { TaskService } from "./task.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Sector, Task, TaskSector]), UserModule],
  controllers: [SectorsController, TaskController],
  providers: [TaskService, SectorsService],
})
export class TaskModule {}
