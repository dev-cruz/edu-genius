import { Subject } from '@prisma/client';
import { SubjectCreateDto } from 'src/application/dtos/subjectCreateDto';

export interface ISubjectRepository {
  findAll(): Promise<Subject[]>;
  create(subject: SubjectCreateDto): Promise<Subject>;
}
