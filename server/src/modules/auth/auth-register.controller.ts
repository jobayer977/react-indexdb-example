import { RegisterDto } from "./requests/register.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { AppHeaders } from "src/decorators/appHeaders.decorator";
import { Body, Controller, Post } from "@nestjs/common";
import { AuthRegisterService } from "./auth-register.service";

@ApiTags("Auth Register")
@AppHeaders()
@Controller("/auth/register")
export class AuthRegisterController {
  constructor(private readonly authRegisterService: AuthRegisterService) {}

  @Post("user")
  @ApiBody({ type: RegisterDto })
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    return this.authRegisterService.register(registerDto);
  }
}
