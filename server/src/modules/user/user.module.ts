import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

/*
https://docs.nestjs.com/modules
*/
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController, UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
