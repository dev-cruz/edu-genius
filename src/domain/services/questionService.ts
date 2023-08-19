import { Question } from 'src/domain/entitites/question.entity';
import { QuestionFilters } from 'src/domain/repositories/questionRepository';

export class QuestionService {
  public async getByFilters(filters: QuestionFilters): Promise<Question[]> {
    // TODO: implementar logica para obter perguntas;
  }
}
