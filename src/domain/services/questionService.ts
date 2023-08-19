import { Injectable } from '@nestjs/common';
import { Question } from 'src/domain/entitites/question.entity';
import { QuestionFilters } from 'src/domain/repositories/questionRepository';
import { OpenAIService } from 'src/opeani/openAIService';

@Injectable()
export class QuestionService {
  constructor(private readonly openAIService: OpenAIService) { }

  public async getByFilters(filters: QuestionFilters): Promise<Question[]> {
    const subjectRepository = {
      1: 'matematica',
      2: 'portugues',
      3: 'historia',
      4: 'geografia'
    }
    const subject = subjectRepository[filters.subjectId];
    const questions = await this.openAIService.generateQuestions(
      filters.level,
      subject,
      filters.numberOfQuestions
    );


    return questions;
    // TODO: implementar logica para obter perguntas;
  }
}
