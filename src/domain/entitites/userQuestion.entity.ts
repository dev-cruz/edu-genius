import { Question } from './question.entity';
import { User } from './user.entity';

export class UserQuestion {
  public id: number;
  public userId: number;
  public questionId: number;
  public answer: string;
  public isCorrect: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  public user: User;
  public question: Question;
}
