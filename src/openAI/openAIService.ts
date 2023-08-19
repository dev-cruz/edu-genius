import { Injectable } from '@nestjs/common';
import { OpenAIConfig } from './openAIConfig';

@Injectable()
export class OpenAIService {
  constructor(private readonly openai: OpenAIConfig) {}
    
  async generateQuestions(level:string, subject:string, questions: number): Promise<any> {  
    const completion = await this.openai.instance().chat.completions.create({
      messages: [{ role: 'user', content: this.prompt(level, subject, questions)}],
      model: 'gpt-3.5-turbo',
    });

    console.log(completion.choices);

    return completion.choices;
  }

  private prompt(level:string, subject:string, questions: number): string {
    return `Gere ${questions} questões de múltipla escolha do nível ${level} da disciplina ${subject}`
  }
}
