import { Injectable } from '@nestjs/common';
import { OpenAIConfig } from './openAIConfig';

@Injectable()
export class OpenAIService {
  constructor(private readonly openai: OpenAIConfig) {}
    
  async prompt(): Promise<any> {  
    const completion = await this.openai.instance().chat.completions.create({
      messages: [{ role: 'user', content: 'Say this is a test' }],
      model: 'gpt-3.5-turbo',
    });

    console.log(completion.choices);

    return completion.choices;
  }
}
