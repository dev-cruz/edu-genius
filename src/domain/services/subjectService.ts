import { Inject, Injectable } from '@nestjs/common';
import { Subject } from '@prisma/client';
import { ISubjectRepository } from 'src/domain/repositories/subjectRepository';

@Injectable()
export class SubjectService {
  constructor(
    @Inject('SUBJECT_REPOSITORY')
    private readonly subjectRepository: ISubjectRepository,
  ) {}

  public async listSubjects(): Promise<Subject[]> {
    return this.subjectRepository.findAll();
  }
}
