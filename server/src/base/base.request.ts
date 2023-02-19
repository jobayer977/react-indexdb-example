import { ApiProperty } from "@nestjs/swagger";

export class BaseFilterRequestDTO {
  @ApiProperty()
  searchTerm: string;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  take: number;
}
