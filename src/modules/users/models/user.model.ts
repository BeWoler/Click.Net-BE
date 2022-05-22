import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@ObjectType()
@Entity()
@Unique(['id'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'id of the user' })
  id: string;

  @Column({ unique: true })
  @Field(() => String, { description: 'email of the user' })
  email: string;

  @Column({ unique: true })
  @Field(() => String, { description: 'username of the user' })
  username: string;
}
