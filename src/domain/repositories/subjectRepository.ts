export interface ISubjectRepository {
  findAllForUser(userId: number): Subject[];
}
