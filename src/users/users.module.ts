import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { Users } from './entities/users.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [TypegooseModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
