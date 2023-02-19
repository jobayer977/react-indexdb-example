import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";
import { BcryptService } from "./bcrypt.service";
import { JwtService } from "./jwt.service";
import { LoginDTO } from "./requests/logindto";

@Injectable()
export class AuthLoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService
  ) {}

  async userLogin(loginDto: LoginDTO): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: loginDto.email,
        },
        select: ["id", "email", "password"],
      });
      if (!user) {
        throw new Error("User not found");
      }
      const isPasswordMatched = this.bcryptService.compare(
        loginDto?.password,
        user?.password
      );

      if (!isPasswordMatched) {
        throw new Error("Password not matched");
      }
      const token = await this.jwtService.makeAccessToken({
        id: user.id,
      });
      return token;
    } catch (error) {
      throw error;
    }
  }
}
