import { BadRequestException, Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { I18nService } from 'nestjs-i18n'
import { InjectModel } from 'nestjs-typegoose'
import { CreateUserDto } from './dto/create-user.dto'
import { Users } from './entities/users.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private readonly usersModel: ReturnModelType<typeof Users>,
    private readonly i18n: I18nService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = new this.usersModel(createUserDto)
      const userRegistered = await newUser.save()

      if (userRegistered?._id) {
        return {
          msg: await this.i18n.translate('translate.users.register.success'),
        }
      } else {
        return {
          msg: await this.i18n.translate(
            'translate.users.register.errors.others',
          ),
        }
      }
    } catch (e) {
      if (e?.code == 11000)
        throw new BadRequestException(
          await this.i18n.translate('translate.users.register.errors.dup'),
        )
      throw new BadRequestException(e.message)
    }
  }

  findOne(query: Partial<Users>) {
    console.log('PASSOU')
    try {
      return this.usersModel.findOne(query).exec()
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }
}
