import { Field, ObjectType } from '@nestjs/graphql';
import { Like } from 'src/modules/likes/models/like.model';
import { Post } from 'src/modules/posts/models/post.model';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';

@ObjectType()
@Entity()
@Unique(['id'])
export class User {
  @PrimaryGeneratedColumn('rowid')
  @Field(() => String, { description: 'ID of the user' })
  id: string;

  @Column({ unique: true })
  @Field(() => String, { description: 'Email of the user' })
  email: string;

  @Column()
  @Field(() => String, { description: 'Password of the user', nullable: true })
  password: string;

  @Field(() => String, { description: 'User posts' })
  @OneToMany(() => Post, (post) => post)
  posts: Post[];

  @Field(() => String, { description: 'User likes' })
  @OneToMany(() => Like, (like) => like)
  likes: Like[];
}
