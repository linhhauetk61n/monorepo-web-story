import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { ChapterEntity } from './entities/chapter.entity';
import { StoryEntity } from './entities/story.entity';

@Injectable()
export class StoryService {
  constructor(private dataSource: DataSource) {}

  storyRepository = this.dataSource.getRepository(StoryEntity);
  chapterRepository = this.dataSource.getRepository(ChapterEntity);

  async create(createStoryDto: CreateStoryDto, userId: string) {
    const story = this.storyRepository.create();
    story.posterId = userId;
    story.title = createStoryDto.title;
    story.description = createStoryDto.description;
    return await this.storyRepository.save(story);
  }

  findAll() {
    return this.storyRepository.find({
      relations: {
        poster: true,
      },
      select: {
        poster: {
          username: true,
          email: true,
          displayName: true,
          avatarImg: true,
          role: true,
        },
      },
    });
  }

  findStoryById(id: string) {
    return this.storyRepository.findOne({
      where: { id },
      relations: ['chapters'],
    });
  }

  async createChapter(createChapterDto: CreateChapterDto, userId: string) {
    const story = await this.findStoryById(createChapterDto.storyId);
    if (!story)
      throw new BadRequestException(
        'No have story you want to post this chapter',
      );
    if (story.posterId !== userId)
      throw new BadRequestException(
        "You don't have permission to post chapter to this story",
      );
    const chapter = await this.chapterRepository.create();
    chapter.title = createChapterDto.title;
    chapter.content = createChapterDto.content;
    chapter.storyId = createChapterDto.storyId;
    chapter.numberOfChapter = story.chapters.length + 1;
    return await this.chapterRepository.save(chapter);
  }

  findOne(id: number) {
    return `This action returns a #${id} story`;
  }

  update(id: number, updateStoryDto: UpdateStoryDto) {
    return `This action updates a #${id} story`;
  }

  remove(id: number) {
    return `This action removes a #${id} story`;
  }
}
