import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { Users } from 'src/users/entities/users.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_TOKEN_SECRET,
    })
  }

  async validate(payload: Users) {
    return {
      _id: payload._id,
      email: payload.email,
    }
  }
}
