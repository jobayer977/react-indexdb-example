import { Body, Get, Post } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { AppHeaders } from "src/decorators/appHeaders.decorator";
import { CreateSectorDTO } from "./request/create-sector.dto";
import { Sector } from "./sectors.entity";
import { SectorsService } from "./sectors.service";
@ApiTags("Sectors")
@AppHeaders()
@Controller("/sectors")
export class SectorsController {
  constructor(private sectorsService: SectorsService) {}
  @Post()
  @ApiBody({ type: CreateSectorDTO })
  async insert(@Body() reqPayloads: CreateSectorDTO): Promise<Sector> {
    return this.sectorsService.create(reqPayloads);
  }
  @Get()
  async findAll(): Promise<Sector[]> {
    return this.sectorsService.filter();
  }
  //   @Put("/:id")
  //   @ApiBody({ type: UpdateUserDTO })
  //   async update(
  //     @Param("id") id: string,
  //     @Body() reqPayloads: UpdateUserDTO
  //   ): Promise<any> {
  //     return this.userService.updateUser(id.trim(), reqPayloads);
  //   }
  //   @Delete("/:id")
  //   async delete(@Param("id") id: string): Promise<User> {
  //     return this.userService.deleteUser(id.trim());
  //   }
  //   @Get("/:id")
  //   async findById(@Param("id") id: string): Promise<User> {
  //     return this.userService.findById(id.trim());
  //   }
  // }
}
