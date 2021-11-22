import { Controller, Get, Post, Body } from '@nestjs/common'
import { VehiclesService } from './vehicles.service'
import { CreateVehicleDto } from './dto/create-vehicle.dto'
import { Vehicle } from './entities/vehicle.entity'

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto)
  }

  @Get()
  findAll(@Body() vehicle?: Partial<Vehicle>) {
    return this.vehiclesService.findAll(vehicle)
  }
}
