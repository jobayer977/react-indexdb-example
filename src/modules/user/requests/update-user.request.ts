import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateUserDTO {
  @ApiProperty({ required: true, example: "Jon Doe" })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ required: true, example: "0195375354" })
  @IsNotEmpty()
  readonly phoneNumber: string;
}
