import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetPostArgs {
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  id: string;

  @Field(() => String)
  @IsNotEmpty()
  title: string;
}
