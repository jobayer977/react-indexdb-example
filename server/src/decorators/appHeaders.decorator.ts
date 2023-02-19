import { ApiHeader } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

enum ENUM_CLIENT_TYPE {
  WEB = 'WEB',
  APP = 'APP',
}

export function AppHeaders() {
  return applyDecorators(
    ApiHeader({
      name: 'x-client-name',
      example: ENUM_CLIENT_TYPE.WEB,
      required: true,
      enum: ENUM_CLIENT_TYPE,
    }),
  );
}
