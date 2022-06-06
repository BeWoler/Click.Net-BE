import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@ObjectType()
@Entity()
@Unique(['id'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'ID of the user' })
  id: string;

  @Column({ unique: true })
  @Field(() => String, { description: 'Email of the user' })
  email: string;

  @Column()
  @Field(() => String, { description: 'Password of the user', nullable: true })
  password: string;
}
