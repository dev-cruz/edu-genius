export type QuestionFilters = {
  subjectId: number;
  level: 'easy' | 'medium' | 'hard';
  numberOfQuestions: number;
}

export interface IQuestionRepository {
  getByFilters(filters: QuestionFilters): Promise<Question[]>;
}
