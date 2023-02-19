import { ApiProperty } from "@nestjs/swagger";
import { BaseFilterRequestDTO } from "src/base/base.request";

export class FilterTaskDTO extends BaseFilterRequestDTO {
  @ApiProperty({ required: false })
  userId?: string;
}
