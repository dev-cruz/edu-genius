import OpenAI from 'openai';

import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenAIService {
  constructor(private readonly openai: OpenAI) {}
    
  async prompt(): Promise<any> {  
    const completion = await this.openai.chat.completions.create({
      messages: [{ role: 'user', content: 'Say this is a test' }],
      model: 'gpt-3.5-turbo',
    });

    console.log(completion.choices);

    return completion.choices;
  }
}
