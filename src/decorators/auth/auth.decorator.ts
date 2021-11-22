import { applyDecorators, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

export function JWTAuth() {
  return applyDecorators(UseGuards(JwtAuthGuard))
}
