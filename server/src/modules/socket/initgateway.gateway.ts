import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
@WebSocketGateway({
  cors: {
    origin: "*",
  },
  namespace: "init",
})
export class InitGatewayGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  handleConnection(client: any, ...args: any[]) {
    const socketID = client.id;
    const userId = client.handshake.query?.userId;
    console.log({
      socketID,
      userId,
    });
  }
  @SubscribeMessage("CALL_OFFER")
  handleCallStart(@MessageBody() message: any): void {
    this.server.emit("CALL_OFFER", message);
  }

  @SubscribeMessage("CALL_ANSWER")
  handleCallAnswer(@MessageBody() message: any): void {
    this.server.emit("CALL_ANSWER", message);
  }

  @SubscribeMessage("CALL_ICE_CANDIDATE")
  handleCallIceCandidate(@MessageBody() message: any): void {
    this.server.emit("CALL_ICE_CANDIDATE", message);
  }
}
