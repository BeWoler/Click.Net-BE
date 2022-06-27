import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../users/models/user.model';
import { GetPostArgs } from './dtos/args/getPost.args';
import { CreatePostInput } from './dtos/inputs/createPost.input';
import { Post } from './models/post.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  public async createPost(postData: CreatePostInput): Promise<Post> {
    return this.postsRepository.create({ ...postData });
  }

  public async getPostByTitle(postArgs: GetPostArgs): Promise<Post> {
    return this.postsRepository.findOne({
      where: { title: postArgs.title },
    });
  }

  public async getPostById(postArgs: GetPostArgs): Promise<Post> {
    return this.postsRepository.findOne({
      where: { id: postArgs.id },
    });
  }

  public async getAllPosts(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  public async deletePost(postId: string): Promise<DeleteResult> {
    return this.postsRepository.delete(postId);
  }
}
