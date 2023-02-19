import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
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

  @ApiProperty({ type: "string", example: "123456" })
  @IsString()
  @MaxLength(255)
  @MinLength(6)
  password: string;
}
