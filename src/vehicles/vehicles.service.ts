import { BadRequestException, Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CreateVehicleDto } from './dto/create-vehicle.dto'
import { Vehicle } from './entities/vehicle.entity'

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle)
    private readonly vehiclesModel: ReturnModelType<typeof Vehicle>,
  ) {}

  create(createVehicleDto: CreateVehicleDto) {
    try {
      const newVehicle = new this.vehiclesModel(createVehicleDto)
      return newVehicle.save()
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  findAll(vehicle?: Partial<Vehicle>) {
    try {
      return this.vehiclesModel.find(vehicle || {}).exec()
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  find(search: string) {
    try {
      const query: any = {}
      const regex = { $regex: `.*${search}.*` }

      const or: any[] = [
        {
          color: regex,
        },
        {
          plate: regex,
        },
        {
          type: regex,
        },
      ]

      query.$or = or

      return this.vehiclesModel.find(query).exec()
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }
}
