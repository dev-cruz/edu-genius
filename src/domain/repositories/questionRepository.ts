import { Question } from '../entitites/question.entity';

export type QuestionFilters = {
  subjectId: number;
  level: number;
  numberOfQuestions: number;
};

export interface IQuestionRepository {
  getByFilters(filters: QuestionFilters): Promise<Question[]>;
}
