import { Injectable } from '@nestjs/common';
import { OpenAIService } from './opeani/openAIService';

@Injectable()
export class AppService {
  constructor(private readonly openAIService: OpenAIService) {}

  getHello(): any {
    return this.openAIService.generateQuestions('médio', 'matemática', 2);
  }
}
