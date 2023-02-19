/*
https://docs.nestjs.com/modules
*/

import { InitGatewayGateway } from "./initgateway.gateway";
import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [],
  providers: [InitGatewayGateway],
})
export class SocketModule {}
