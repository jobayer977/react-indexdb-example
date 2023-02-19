import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();
    console.error(" ⛔ Call From All Exception Handler ⛔", exception);
    console.error(" ⛔ Call From All Exception Handler ⛔", exception);

    let statusCode: number;
    let errorMessages: string[] = [exception.message];
    if (exception instanceof TypeError) {
      console.error(exception.message, exception.stack, exception.name);
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

      if (exception.message) {
        errorMessages = [exception.message];
      } else {
        errorMessages = ["Internal Server Error"];
      }
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const res: any = exception.getResponse();
      if (exception instanceof ForbiddenException) {
        errorMessages = ["Unauthorized request"];
      } else {
        errorMessages =
          typeof res.message === "string" ? [res.message] : res.message;
      }
    } else {
      if (
        exception.message &&
        exception.message.includes(
          "QueryFailedError: invalid input syntax for type uuid"
        )
      ) {
        errorMessages = ["Invalid id"];
        statusCode = HttpStatus.BAD_REQUEST;
      } else {
        errorMessages = errorMessages
          ? errorMessages
          : ["Internal Server Error"];
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      }
    }

    // this.logger.error(exception.message, exception);

    const res = {
      success: false,
      statusCode: statusCode,
      message:
        Array.isArray(errorMessages) && errorMessages?.length
          ? errorMessages[0]
          : "something went wrong",
      errorMessages,
      // developerMessage: exception.message,
    };
    response.status(statusCode).json(res);
  }
}
