import { Column, Entity } from "typeorm";

import { BaseEntity } from "src/base/base.entity";
import { IsEmail } from "class-validator";
import { UserType } from "./requests/user.type.enum";

@Entity("users")
export class User extends BaseEntity {
  @Column({ unique: false, nullable: true })
  phoneNumber?: string;

  @Column({ select: false })
  password?: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ unique: false, nullable: true })
  @IsEmail()
  email?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true, comment: "CUSTOMER/ADMIN" })
  type?: UserType;
}
