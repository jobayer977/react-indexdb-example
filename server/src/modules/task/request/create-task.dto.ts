import { IsArray, IsNotEmpty } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDTO {
  @ApiProperty({ required: true, example: "Task Name" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    example: [
      "2507d669-0eea-4ed6-bc1a-8e5d3e53be36",
      "04c84fd3-40bb-46e6-ba1a-1068e315c002",
    ],
  })
  @IsNotEmpty()
  @IsArray()
  sectors: string[];
}
