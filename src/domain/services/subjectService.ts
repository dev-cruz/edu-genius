import { Inject, Injectable } from '@nestjs/common';
import { Subject } from '@prisma/client';
import { SubjectCreateDto } from 'src/application/dtos/subjectCreateDto';
import { ISubjectRepository } from 'src/domain/repositories/subjectRepository';

@Injectable()
export class SubjectService {
  constructor(
    @Inject('SUBJECT_REPOSITORY')
    private readonly subjectRepository: ISubjectRepository,
  ) {}

  public async create(subject: SubjectCreateDto): Promise<Subject> {
    return this.subjectRepository.create(subject);
  }

  public async listSubjects(): Promise<Subject[]> {
    return this.subjectRepository.findAll();
  }
}
