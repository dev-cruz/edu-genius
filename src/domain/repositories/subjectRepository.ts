import { Subject } from 'src/domain/entitites/subject.entity';

export interface ISubjectRepository {
  findAllForUser(userId: number): Subject[];
}
