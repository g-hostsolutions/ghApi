import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { VehiclesModule } from 'src/vehicles/vehicles.module'
import { VehiclesService } from 'src/vehicles/vehicles.service'
import { HttpModule } from '@nestjs/axios'
import { TypegooseModule } from 'nestjs-typegoose'
import { Vehicle } from 'src/vehicles/entities/vehicle.entity'

@Module({
  imports: [TypegooseModule.forFeature([Vehicle]), VehiclesModule, HttpModule],
  controllers: [ProductsController],
  providers: [ProductsService, VehiclesService],
})
export class ProductsModule {}
