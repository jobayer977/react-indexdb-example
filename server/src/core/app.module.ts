import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";

import { AppController } from "./app.controller";
import { AppExceptionFilter } from "src/filter/appException.filter";
import { AppResponseInterceptor } from "src/interceptors/appResponse.interceptor";
import { AppService } from "./app.service";
import { AuthModule } from "../modules/auth/auth.module";
import { DatabaseModule } from "../database/database.module";
import { Module } from "@nestjs/common";
import { SocketModule } from "../modules/socket/socket.module";
import { UserModule } from "../modules/user/user.module";

@Module({
  imports: [SocketModule, DatabaseModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AppResponseInterceptor,
    },
  ],
})
export class AppModule {}
