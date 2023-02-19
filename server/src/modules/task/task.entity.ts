import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

import { BaseEntity } from "src/base/base.entity";
import { TaskSector } from "./taskSector.entity";
import { User } from "../user/user.entity";

@Entity("tasks")
export class Task extends BaseEntity {
  @Column({ unique: false, nullable: true })
  title?: string;

  @OneToMany(() => TaskSector, (entity) => entity.task)
  taskSectors?: TaskSector[];

  // relations with user
  @ManyToOne(() => User, (entity) => entity.tasks)
  user?: User;
}
