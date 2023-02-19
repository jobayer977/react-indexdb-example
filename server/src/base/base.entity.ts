import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Generated,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import { IsBoolean, IsString } from 'class-validator'

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: true })
  @Generated('increment')
  serial?: number;

  @IsBoolean({ always: true })
  @Column({ type: 'boolean', default: true })
  isActive?: boolean;

  @IsString({ always: true })
  @Column({ type: 'varchar', length: 100, nullable: true, select: false })
  createdBy?: string;

  @IsString({ always: true })
  @Column({ type: 'varchar', length: 100, nullable: true, select: false })
  updatedBy?: string;

  @IsString({ always: true })
  @Column({ type: 'varchar', length: 100, default: true, select: false })
  deletedBy?: string;

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ nullable: true, select: false })
  deletedAt?: Date;
}
