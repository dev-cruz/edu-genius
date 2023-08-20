import { Inject } from '@nestjs/common';
import { PrismaClient, Subject } from '@prisma/client';
import { SubjectCreateDto } from 'src/application/dtos/subjectCreateDto';
import { ISubjectRepository } from 'src/domain/repositories/subjectRepository';

export class SubjectRepositoryImpl implements ISubjectRepository {
  constructor(@Inject(PrismaClient) private readonly prisma: PrismaClient) { }

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
  async findByID(id: number): Promise<Subject | null> {
    return this.prisma.subject.findUnique({
      where: {
        id,
      },
      include: {
        children: true,
      },
    });
  }

  async findOrCreate(subject: {
    name: string;
    parent_id?: number;
  }): Promise<Subject> {
    const { name, parent_id } = subject;
    const [foundSubject] = await this.prisma.subject.findMany({
      where: { name, parent_id },
    });

    if (foundSubject) {
      return foundSubject;
    }

    const createdSubject = await this.prisma.subject.create({
      data: subject,
    });

    return createdSubject;
  }
}
