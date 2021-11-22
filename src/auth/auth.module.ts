import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { LocalStrategy } from './local.strategy'
import { JwtStrategy } from './jwt.strategy'
import { Users } from 'src/users/entities/users.entity'
import { TypegooseModule } from 'nestjs-typegoose'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
    }),
    TypegooseModule.forFeature([Users]),
    PassportModule,
    JwtModule.register({
      secret: <string>process.env.JWT_TOKEN_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
