/*
https://docs.nestjs.com/providers#services
*/

import * as bcryptjs from "bcryptjs";

import { Injectable } from "@nestjs/common";

@Injectable()
export class BcryptService {
  public async hash(password: string): Promise<string> {
    return bcryptjs.hash(password, 10);
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    try {
      return bcryptjs.compare(password, hash);
    } catch (error) {
      return false;
    }
  }
}
