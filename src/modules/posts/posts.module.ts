import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from '../likes/models/like.model';
import { User } from '../users/models/user.model';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, Like])],
  providers: [TypeOrmModule],
  exports: [PostsService, PostsResolver],
})
export class PostsModule {}
