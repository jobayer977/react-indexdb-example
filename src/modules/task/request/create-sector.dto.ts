import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateSectorDTO {
  @ApiProperty({ required: true, example: "Sector Name" })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: false, example: "parent" })
  parent?: string;
}
