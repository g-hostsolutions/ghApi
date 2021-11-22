import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const AuthUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest(),
      token = request.headers.authorization.replace('Bearer ', ''),
      user = request.user

    let userData = user

    if (data === 'token') {
      userData = token
    } else if (data) {
      userData = user?.[data]
    }

    return userData
  },
)
