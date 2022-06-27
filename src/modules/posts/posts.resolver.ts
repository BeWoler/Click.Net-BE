import { Post } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}
}
