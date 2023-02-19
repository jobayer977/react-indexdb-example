import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseFilterRequestDTO } from "src/base/base.request";
import { paginate, paginationOptions } from "src/utils/paginate.util";
import { Raw, Repository } from "typeorm";
import { UserType } from "./requests/user.type.enum";
import { User } from "./user.entity";
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async filter(options: BaseFilterRequestDTO): Promise<any> {
    try {
      const pOptions: any = paginationOptions(options);
      const response = await this.userRepository.findAndCount({
        order: { createdAt: "ASC" },
        where: {
          firstName: Raw(
            (alias) =>
              `LOWER(${alias}) Like '%${options.searchTerm.toLowerCase()}%'`
          ),
          lastName: Raw(
            (alias) =>
              `LOWER(${alias}) Like '%${options.searchTerm.toLowerCase()}%'`
          ),
        },
        skip: pOptions.skip,
        take: pOptions.take,
      });
      return paginate(pOptions, response);
    } catch (error) {
      throw new Error(error);
    }
  }
  async checkIfUserExist(phoneNumber: string, type: UserType): Promise<User> {
    try {
      return this.userRepository.findOne({
        where: {
          phoneNumber: phoneNumber,
          type: type,
        },
      });
    } catch (error) {
      return error;
    }
  }
  async createUser(user: User): Promise<User> {
    try {
      const isAlreadyExist = await this.checkIfUserExist(
        user.phoneNumber,
        user.type
      );
      if (isAlreadyExist) {
        throw new Error("User already exist");
      }
      return this.userRepository.save(user);
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateUser(userId: string, user: User): Promise<User> {
    try {
      await this.userRepository.update(userId, user);
      return this.userRepository.findOne({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteUser(userId: string): Promise<User> {
    try {
      const isUserExist = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });
      if (isUserExist) {
        await this.userRepository.delete(userId);
        return isUserExist;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async findById(userId: string): Promise<User> {
    try {
      return this.userRepository.findOne({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
