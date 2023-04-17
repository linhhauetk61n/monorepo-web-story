import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: UserEntity,
  })
  @ApiBadRequestResponse({
    description: 'User cannot register. Try again!',
  })
  @UsePipes(ValidationPipe)
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('/login')
  @ApiCreatedResponse({
    description: 'Return AccessToken',
  })
  @ApiBadRequestResponse({
    description: 'Username or password are incorrect',
  })
  @UsePipes(ValidationPipe)
  login(@Body() createUserDto: CreateUserDto) {
    return this.userService.login(createUserDto);
  }
}
