import { AuthLoginController } from "./auth-login.controller";
import { AuthLoginService } from "./auth-login.service";
import { AuthRegisterController } from "./auth-register.controller";
import { AuthRegisterService } from "./auth-register.service";
import { BcryptService } from "./bcrypt.service";
import { JwtService } from "./jwt.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthLoginController, AuthRegisterController],
  providers: [AuthRegisterService, BcryptService, JwtService, AuthLoginService],
})
export class AuthModule {}
