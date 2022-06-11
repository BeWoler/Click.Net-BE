import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/users/models/user.model';
import { Like } from 'src/modules/likes/models/like.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@ObjectType()
@Entity()
@Unique(['id'])
export class Post {
  @PrimaryGeneratedColumn('rowid')
  @Field(() => String, { description: 'ID of the post' })
  id: string;

  @Column()
  @Field(() => String, { description: 'Title of the post' })
  title: string;

  @Column()
  @Field(() => String, { description: 'Text of the post' })
  text: string;

  @Column()
  @Field(() => String, { description: 'Author of the post' })
  @ManyToOne(() => User, (user) => user)
  @JoinColumn()
  user: User;

  @Column()
  @Field(() => String, { description: 'Likes' })
  @OneToMany(() => Like, (like) => like)
  @JoinColumn()
  likes: Like[];
}
