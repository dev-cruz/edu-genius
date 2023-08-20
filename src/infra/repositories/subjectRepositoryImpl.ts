import { Inject } from '@nestjs/common';
import { PrismaClient, Subject } from '@prisma/client';
import { SubjectCreateDto } from 'src/application/dtos/subjectCreateDto';
import { ISubjectRepository } from 'src/domain/repositories/subjectRepository';

export class SubjectRepositoryImpl implements ISubjectRepository {
  constructor(@Inject(PrismaClient) private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Subject[]> {
    return this.prisma.subject.findMany({
      where: {
        parent_id: null,
      },
      include: {
        children: true,
      },
    });
  }

  async create(subject: SubjectCreateDto): Promise<Subject> {
    return this.prisma.subject.create({
      data: subject,
    });
  }
}
