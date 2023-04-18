import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from 'src/common/base.entity';
import { StoryStatus } from 'src/common/enum';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChapterEntity } from './chapter.entity';

@Entity('stories')
export class StoryEntity extends AbstractEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column({ default: '' })
  coverImg: string;

  @ApiProperty({ type: StoryStatus })
  @Column({ type: 'enum', enum: StoryStatus, default: StoryStatus.CONTINUING })
  status: StoryStatus;

  @ApiProperty()
  @Column()
  posterId: string;

  @ManyToOne(() => UserEntity, (user) => user.stories)
  @JoinColumn({ name: 'userId' })
  poster: UserEntity;

  @OneToMany(() => ChapterEntity, (chapter) => chapter.story)
  chapters: ChapterEntity[];
}
