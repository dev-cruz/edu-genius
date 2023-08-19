import { Injectable } from '@nestjs/common';
import { OpenAIConfig } from './openAIConfig';

@Injectable()
export class OpenAIService {
  constructor(private readonly openai: OpenAIConfig) {}
    
  async generateQuestions(level:number, subject:string, numberOfQuestions: number): Promise<any> {  
    const completion = await this.openai.instance().chat.completions.create({
      messages: [{ role: 'user', content: this.prompt(level, subject, numberOfQuestions)}],
      model: 'gpt-3.5-turbo',
    });

    console.log(completion.choices);

    return JSON.parse(completion.choices[0].message.content);
  }

  private prompt(level:number, subject:string, questions: number): string {
    return `Gere ${questions} questões de múltipla escolha, ${this.level(level)} da disciplina ${subject}, a sua resposta deve ser um JSON com o seguinte formato: ${this.format()}`
  }

  private level(level:number): string {
    return 'levando em consideração a medida de 1 a 10, onde 1 é extramente fácil e 10 é extremamente difícil, considere o nivel da questão como sendo ' + level;
  }
  private format(): string {
    return `[{question: pergunta, anwsers: [resposta1, resposta2, resposta3, resposta4], correctAnswer: respostaCorreta}]`
  }
}
