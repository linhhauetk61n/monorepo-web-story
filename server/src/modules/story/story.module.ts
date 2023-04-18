import { Module } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryController } from './story.controller';
import { UserService } from '../user/user.service';

@Module({
  controllers: [StoryController],
  providers: [StoryService, UserService],
})
export class StoryModule {}
