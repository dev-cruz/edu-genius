import OpenAI from 'openai';

import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenAIConfig {
  instance(): OpenAI {
    return new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
}
