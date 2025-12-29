import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AiService } from './ai.service';
import { AiChatInput, } from '../../libs/dto/AI/ai';
import { AiChatResponse } from '../../libs/dto/AI/ai.dto';


@Resolver()
export class AiResolver {
  constructor(private readonly aiService: AiService) {}

  @Mutation(() => AiChatResponse)
async aiChat(
  @Args('input') input: AiChatInput,
): Promise<AiChatResponse> {

  const text = await this.aiService.chat([
    { role: 'user', content: input.message },
  ]);

  return {
    ok: true,
    reply: text,
  };
}
}