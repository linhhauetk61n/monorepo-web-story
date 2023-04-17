import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRole } from 'src/common/enum';
import { AuthGuard } from './auth/auth.guard';
import { Roles } from './auth/roles.decorator';
import { RolesGuard } from './auth/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller()
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

  @Get('admin/users')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  getUsersByAdmin() {
    return this.userService.getAllUser();
  }
}
