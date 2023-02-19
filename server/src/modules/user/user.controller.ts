import { UserService } from "./user.service";
import { ApiBody, ApiTags } from "@nestjs/swagger";

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { CreateUserDTO } from "./requests/create-user.request";
import { AppHeaders } from "src/decorators/appHeaders.decorator";
import { UpdateUserDTO } from "./requests/update-user.request";
import { User } from "./user.entity";
import { BaseFilterRequestDTO } from "src/base/base.request";
@ApiTags("Users")
@AppHeaders()
@Controller("/users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(@Query() options: BaseFilterRequestDTO): Promise<User[]> {
    return this.userService.filter(options);
  }

  @Post()
  @ApiBody({ type: CreateUserDTO })
  async insert(@Body() reqPayloads: CreateUserDTO): Promise<User> {
    return this.userService.createUser(reqPayloads);
  }

  @Put("/:id")
  @ApiBody({ type: UpdateUserDTO })
  async update(
    @Param("id") id: string,
    @Body() reqPayloads: UpdateUserDTO
  ): Promise<any> {
    return this.userService.updateUser(id.trim(), reqPayloads);
  }

  @Delete("/:id")
  async delete(@Param("id") id: string): Promise<User> {
    return this.userService.deleteUser(id.trim());
  }

  @Get("/:id")
  async findById(@Param("id") id: string): Promise<User> {
    return this.userService.findById(id.trim());
  }
}
