import { Controller, Post, Body } from '@nestjs/common'

import { AuthService } from './auth.service'
import { userLoginDto } from './dtos/userLogin.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async loginPost(@Body() user: userLoginDto) {
    return this.authService.login(user)
  }
}
