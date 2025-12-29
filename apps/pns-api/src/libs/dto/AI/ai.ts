import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AiChatInput {
  @Field(() => String)
  message!: string;
}