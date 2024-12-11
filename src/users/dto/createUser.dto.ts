import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsEnum(['RM', 'ARM', 'CST'], {
    message: 'Valid role required - RM, ARM, CST',
  })
  @IsString()
  @IsNotEmpty()
  role: string;
}
