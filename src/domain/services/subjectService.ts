export class SubjectService {
  public getSubjectsForUser(userId: number): Subject[] {
    return this.subjectRepository.findAllForUser(userId);
  }
}
