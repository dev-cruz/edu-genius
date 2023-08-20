import { Subject } from '@prisma/client';
import { SubjectCreateDto } from 'src/application/dtos/subjectCreateDto';

export interface ISubjectRepository {
  findAll(): Promise<Subject[]>;
  create(subject: SubjectCreateDto): Promise<Subject>;
  findByID(id: number): Promise<Subject | null>;
  findOrCreate(subject: { name: string; parent_id?: number }): Promise<Subject>;
}
