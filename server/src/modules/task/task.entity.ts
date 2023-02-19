import { Column, Entity, OneToMany } from "typeorm";

import { BaseEntity } from "src/base/base.entity";
import { TaskSector } from "./taskSector.entity";

@Entity("tasks")
export class Task extends BaseEntity {
  @Column({ unique: false, nullable: true })
  title?: string;

  @OneToMany(() => TaskSector, (entity) => entity.task)
  taskSectors?: TaskSector[];
}
