import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/modules/posts/models/post.model';
import { User } from 'src/modules/users/models/user.model';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@ObjectType()
@Entity()
@Unique(['id'])
export class Like {
  @PrimaryGeneratedColumn('rowid')
  @Field(() => String, { description: 'ID of the like' })
  id: string;

  @Field(() => String, { description: 'A post that gets liked' })
  @ManyToOne(() => Post, (post) => post)
  @JoinColumn()
  post: Post;

  @Field(() => String, { description: 'The user who liked it' })
  @ManyToOne(() => User, (user) => user)
  @JoinColumn()
  user: User;
}
