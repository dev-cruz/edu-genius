import { UserQuestion } from 'src/domain/entitites/userQuestion.entity';

export type UserQuestionRegistry = {
  userId: number;
  questionId: number;
  answer: string;
  isCorrect: boolean;
};

export interface IUserQuestionRepository {
  create(userQuestionRegistry: UserQuestionRegistry): Promise<UserQuestion>;
}
