import { PrismaClient, Subject } from '@prisma/client';
import { ISubjectRepository } from 'src/domain/repositories/subjectRepository';

export class SubjectRepositoryImpl implements ISubjectRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Subject[]> {
    return this.prisma.subject.findMany();
  }
}
