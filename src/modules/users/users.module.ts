import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from '../likes/models/like.model';
import { Post } from '../posts/models/post.model';
import { User } from './models/user.model';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Like])],
  providers: [UsersService, UsersResolver],
  exports: [TypeOrmModule, UsersService],
})
export class UserModule {}
