import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { AppHeaders } from "src/decorators/appHeaders.decorator";
import { AuthLoginService } from "./auth-login.service";
import { LoginDTO } from "./requests/logindto";

@ApiTags("Auth Login")
@AppHeaders()
@Controller("/auth/login")
export class AuthLoginController {
  constructor(private readonly authLoginService: AuthLoginService) {}

  @Post("user")
  @ApiBody({ type: LoginDTO })
  async userLogin(@Body() loginDto: LoginDTO): Promise<any> {
    return await this.authLoginService.userLogin(loginDto);
  }
}
