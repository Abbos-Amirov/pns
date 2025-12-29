import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AiChatResponse {
  @Field(() => Boolean)
  ok!: boolean;

  @Field(() => String)
  reply!: string;
}