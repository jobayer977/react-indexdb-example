import { ApiProperty } from "@nestjs/swagger";

export class BaseFilterRequestDTO {
  @ApiProperty({ required: false })
  searchTerm?: string;

  @ApiProperty({ example: 1, required: false })
  page: number;

  @ApiProperty({ example: 10, required: false })
  take: number;
}
