import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator'

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly plate: string

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly color: string

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly type: string

  @IsNotEmpty()
  @IsNumber()
  readonly price: number
}
