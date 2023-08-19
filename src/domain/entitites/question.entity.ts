import { Prompt } from './prompt.entity';
import { Subject } from './subject.entity';

export class Question {
  public id: number;
  public prompt_id: number;
  public subject_id: number;
  public level: string;
  public description: string;
  public alteternatives: string[];
  public correct_answer: string;
  public createdAt: Date;
  public updatedAt: Date;
  public prompt: Prompt;
  public subject: Subject;
}
