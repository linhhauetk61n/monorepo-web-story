import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    private JwtService: JwtService,
  ) {}

  userRepository = this.dataSource.getRepository(UserEntity);

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (existingUser)
      throw new BadRequestException(
        `Username: ${createUserDto.username} is already exist.`,
      );

    const user = this.userRepository.create();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    const savedUser = await this.userRepository.save(user);
    delete savedUser.password;
    return savedUser;
  }

  async login(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({
      where: { username: createUserDto.password },
    });
    if (!user) throw new BadRequestException();
    if (!user.validatePassword(createUserDto.password))
      throw new UnauthorizedException();
    return await this.generateToken(user);
  }

  async generateToken(user: UserEntity) {
    return {
      accessToken: this.JwtService.sign({ id: user.id, role: user.role }),
    };
  }

  async getUserById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async getAllUser() {
    return await this.userRepository.find({
      select: [
        'createdAt',
        'updatedAt',
        'deletedAt',
        'id',
        'username',
        'email',
        'displayName',
        'avatarImg',
        'role',
      ],
    });
  }
}
