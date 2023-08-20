import { Subject } from '@prisma/client';

export interface ISubjectRepository {
  findAll(): Promise<Subject[]>;
}
