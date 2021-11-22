import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ReturnModelType } from '@typegoose/typegoose'
import { I18nService } from 'nestjs-i18n'
import { InjectModel } from 'nestjs-typegoose'
import { Users } from 'src/users/entities/users.entity'
import { userLoginDto } from './dtos/userLogin.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users)
    private readonly usersModel: ReturnModelType<typeof Users>,
    private jwtService: JwtService,
    private readonly i18n: I18nService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const users = await this.usersModel.find({ email: email }).exec()
      const searchUser = users[0]

      if (searchUser) {
        const matchPass = searchUser.password === password

        delete searchUser.password

        if (matchPass) {
          const payload = {
            ...searchUser,
          }

          return payload
        }
      }

      return null
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  async login(user: userLoginDto) {
    const payload = await this.validateUser(user.email, user.password)

    if (!payload) {
      throw new UnauthorizedException(
        await this.i18n.translate(
          'translate.auth.login.errors.userNotFound.title',
        ),
      )
    }

    return {
      token: this.jwtService.sign(payload),
    }
  }
}
