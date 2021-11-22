import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { I18nModule } from 'nestjs-i18n'
import { TypegooseModule } from 'nestjs-typegoose'
import { typeGooseConfig } from './typeGooseConfig'
import { i18nOptions } from './i18nConfig'
import { VehiclesModule } from './vehicles/vehicles.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
    TypegooseModule.forRoot(process.env.DB_HOST, typeGooseConfig),
    I18nModule.forRoot(i18nOptions),
    AuthModule,
    UsersModule,
    VehiclesModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
