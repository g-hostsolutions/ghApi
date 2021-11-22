import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly password: string
}
