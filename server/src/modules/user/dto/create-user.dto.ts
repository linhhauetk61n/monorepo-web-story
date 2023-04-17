import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 20)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
