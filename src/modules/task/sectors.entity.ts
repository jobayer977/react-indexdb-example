import { Column, Entity, OneToMany } from "typeorm";

import { BaseEntity } from "src/base/base.entity";
import { TaskSector } from "./taskSector.entity";

@Entity("sectors")
export class Sector extends BaseEntity {
  @Column({ unique: false, nullable: true })
  title?: string;

  @Column({ unique: false, nullable: true })
  parent?: string;

  @OneToMany(() => TaskSector, (entity) => entity.sector)
  taskSectors?: TaskSector[];
}
