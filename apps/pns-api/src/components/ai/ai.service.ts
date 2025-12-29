import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;
  private model: string;

  constructor(private readonly config: ConfigService) {
    const apiKey = this.config.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('Missing OPENAI_API_KEY in environment');
    }

    this.openai = new OpenAI({ apiKey });
    this.model = this.config.get<string>('OPENAI_MODEL') || 'gpt-4.1-mini';
  }

  async chat(messages: { role: 'system' | 'user' | 'assistant'; content: string }[]) {
    try {
      // Responses API (tavsiya qilinadi)
      const resp = await this.openai.responses.create({
        model: this.model,
        input: messages.map((m) => ({
          role: m.role,
          content: [{ type: 'input_text', text: m.content }],
        })),
      });

      // Text chiqarib olish
      const text =
        resp.output_text ||
        'No response text returned.';

      return text;
    } catch (err: any) {
      // 401 bo‘lsa
      if (err?.status === 401) {
        throw new UnauthorizedException(
          'OpenAI authentication failed (401). API key invalid/revoked or not loaded from .env',
        );
      }
      throw err;
    }
  }
}