import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { ContextData } from '../user/auth/context';
import { AuthGuard } from '../user/auth/auth.guard';
import { RolesGuard } from '../user/auth/roles.guard';
import { UserRole } from 'src/common/enum';
import { Roles } from '../user/auth/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateChapterDto } from './dto/create-chapter.dto';

@ApiTags('Story')
@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.POSTER)
  create(@Body() createStoryDto: CreateStoryDto, @ContextData() ctx) {
    return this.storyService.create(createStoryDto, ctx.user.id);
  }

  @Get()
  findAll() {
    return this.storyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoryDto: UpdateStoryDto) {
    return this.storyService.update(+id, updateStoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storyService.remove(+id);
  }

  @Post('chapter/create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.POSTER)
  createChapter(
    @Body() createChapterDto: CreateChapterDto,
    @ContextData() ctx,
  ) {
    return this.storyService.createChapter(createChapterDto, ctx.user.id);
  }
}
