import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from 'src/common/base.entity';
import { UserRole } from 'src/common/enum';
import {
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  Entity,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { StoryEntity } from 'src/modules/story/entities/story.entity';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @ApiProperty()
  @Column({ default: '' })
  email: string;

  @ApiProperty()
  @Column()
  displayName: string;

  @ApiProperty()
  @Column({ default: '' })
  avatarImg: string;

  @ApiProperty({ enum: UserRole })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.POSTER })
  role: UserRole;

  @OneToMany(() => StoryEntity, (story) => story.poster)
  stories: StoryEntity[];

  @BeforeInsert()
  async setDisplayName() {
    this.displayName = this.username;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
