import { Module } from "@nestjs/common";
import { Sector } from "./sectors.entity";
import { SectorsController } from "./sectors.controller";
import { SectorsService } from "./sectors.service";
import { Task } from "./task.entity";
import { TaskController } from "./task.controller";
import { TaskSector } from "./taskSector.entity";
import { TaskService } from "./task.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Sector, Task, TaskSector])],
  controllers: [SectorsController, TaskController],
  providers: [TaskService, SectorsService],
})
export class TaskModule {}
