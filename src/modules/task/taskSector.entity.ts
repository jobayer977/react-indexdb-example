import { Entity, ManyToOne } from "typeorm";

import { BaseEntity } from "src/base/base.entity";
import { Sector } from "./sectors.entity";
import { Task } from "./task.entity";

@Entity("task_sectors")
export class TaskSector extends BaseEntity {
  @ManyToOne(() => Task, (entity) => entity.taskSectors)
  task?: string;

  @ManyToOne(() => Sector, (entity) => entity.taskSectors)
  sector?: string;
}
