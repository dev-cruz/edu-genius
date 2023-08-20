import { Injectable } from '@nestjs/common';
import { Teacher } from '@prisma/client';
import { ContentCreateDto } from 'src/application/dtos/contentCreateDto';
import { ContentResultDto } from 'src/application/dtos/contentResultDto';
import { ContentReviewDto } from 'src/application/dtos/contentReviewDto';
import { TeacherCreateDto } from 'src/application/dtos/teacherCreateDto';
import { ITeacherRepository } from 'src/domain/repositories/teacherRepository';
import { TeacherRepositoryImpl } from 'src/infra/repositories/teacherRepositoryImpl';

@Injectable()
export class TeacherService {
  constructor(private readonly teacherRepository: TeacherRepositoryImpl) { }

  public async registerTeacher(teacher: TeacherCreateDto): Promise<Teacher> {
    const createdTeacher =
      await this.teacherRepository.findOrCreateTeacher(teacher);
    return createdTeacher;
  }

  public async createContent(
    content: ContentCreateDto,
  ): Promise<ContentResultDto> {
    // Create content
    // Create content results via OpenAI
    return {} as ContentResultDto;
  }

  public async submitContentReview(review: ContentReviewDto): Promise<void> {
    // Submit content review
  }
}
