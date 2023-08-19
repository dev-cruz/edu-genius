export class QuestionService {
  public async getByFilters(filters: QuestionFilters): Promise<Question[]> {
    const questions = await this.questionRepository.getByFilters(filters);
    return questions;
  }
}
