import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppSuccessResponse } from "./../types/appSuccessResponse.type";
import { IsObject } from "class-validator";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class AppResponseInterceptor implements NestInterceptor {
  constructor() {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((content: any) => {
        if (!content) {
          return new AppSuccessResponse("Successful empty response", null);
        }

        if (content instanceof AppSuccessResponse) {
          return content;
        } else if (content.data && Array.isArray(content.data)) {
          return new AppSuccessResponse("Successful response", content.data, {
            total: content.total,
            take: content.take,
            page: content.page,
            totalPage: content.pageCount,
          });
        } else if (content.data && IsObject(content.data)) {
          return new AppSuccessResponse("Successful response", content.data);
        } else if (IsObject(content) && content.message && !content.data) {
          return new AppSuccessResponse(content.message);
        } else if (IsObject(content)) {
          return new AppSuccessResponse("Successful response", content);
        } else if (content === 200) {
          return content;
        } else if (typeof content === "string") {
          return content;
        } else {
          throw new HttpException(
            "Something went wrong",
            HttpStatus.BAD_REQUEST
          );
        }
      })
    );
  }
}
