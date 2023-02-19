import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";
import { BcryptService } from "./bcrypt.service";
import { JwtService } from "./jwt.service";
import { RegisterDto } from "./requests/register.dto";
@Injectable()
export class AuthRegisterService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService
  ) {}
  async register(registerDto: RegisterDto): Promise<any> {
    try {
      const user: User = await this.userRepository.findOne({
        where: {
          email: registerDto.email,
        },
      });
      if (user) {
        throw new Error("User already exist");
      }
      const hashedPassword = await this.bcryptService.hash(
        registerDto.password
      );
      const newUser = new User();
      newUser.email = registerDto.email;
      newUser.password = hashedPassword;
      await this.userRepository.save(newUser);
      const token = await this.jwtService.makeAccessToken({
        id: newUser.id,
      });
      return token;
    } catch (error) {
      throw error;
    }
  }
}
