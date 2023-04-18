import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from 'src/common/base.entity';
import { ChapterStatus } from 'src/common/enum';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StoryEntity } from './story.entity';

@Entity('chapters')
export class ChapterEntity extends AbstractEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  content: string;

  @ApiProperty()
  @Column()
  numberOfChapter: number;

  @ApiProperty({ type: ChapterStatus })
  @Column({ type: 'enum', enum: ChapterStatus, default: ChapterStatus.DRAFT })
  status: ChapterStatus;

  @ApiProperty()
  @Column()
  storyId: string;

  @ManyToOne(() => StoryEntity, (story) => story.chapters)
  @JoinColumn({ name: 'storyId' })
  story: StoryEntity;
}
