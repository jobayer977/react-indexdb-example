import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  MaxLength,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { UserType } from "./user.type.enum";
export class CreateUserDTO {
  @ApiProperty({ required: true, example: "Jobayer Hossain" })
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty({
    description: "User Email",
    required: true,
    type: String,
    maxLength: 255,
    example: "jon@gmail.com",
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @IsEmail()
  email: string;
  @ApiProperty({ required: true, example: "0185375354" })
  @IsNotEmpty()
  readonly phoneNumber: string;
  @ApiProperty({ required: true, example: "123456" })
  @IsNotEmpty()
  readonly password: string;
}
