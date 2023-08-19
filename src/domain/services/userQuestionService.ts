import { UserQuestionRegistry } from 'src/domain/repositories/userQuestionRepository';

export class UserQuestionService {
  public async registerUserQuestions(
    registryRequest: UserQuestionRegistry[],
  ): Promise<void> {
    for (const registry of registryRequest) {
      // await this.userQuestionRepository.create(registry);
      return;
    }
  }
}
