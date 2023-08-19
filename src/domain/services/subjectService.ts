import { Subject } from 'src/domain/entitites/subject.entity';

export class SubjectService {
  public getSubjectsForUser(userId: number): Subject[] {
    // return this.subjectRepository.findAllForUser(userId);
    return []
  }
}
