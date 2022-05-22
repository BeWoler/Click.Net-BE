import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetUserArgs {
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  id: string;
}
