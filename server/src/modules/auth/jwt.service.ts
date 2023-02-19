/*
https://docs.nestjs.com/providers#services
*/

import * as jwt from "jsonwebtoken";

import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtService {
  public sign(payload: any, options: jwt.SignOptions): string {
    return jwt.sign(payload, "MY_SECRET", options);
  }

  public verify(token: string): any {
    return jwt.verify(token, "MY_SECRET");
  }

  public async makeAccessToken(data: any): Promise<any> {
    const token = this.sign(data, { expiresIn: "60m", algorithm: "HS512" });
    const tokenData = jwt.decode(token);
    return {
      token,
      exp: tokenData.exp,
    };
  }
}
