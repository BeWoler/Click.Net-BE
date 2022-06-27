import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/modules/users/models/user.model';

@InputType()
export class CreatePostInput {
  @Field()
  @IsNotEmpty()
  title!: string;

  @Field()
  @IsNotEmpty()
  text!: string;

  @Field()
  @IsNotEmpty()
  user!: User;
}
