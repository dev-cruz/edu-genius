import { Injectable } from '@nestjs/common';
import { Teacher } from '@prisma/client';
import { ContentCreateDto } from 'src/application/dtos/contentCreateDto';
import { ContentResultDto } from 'src/application/dtos/contentResultDto';
import { ContentReviewDto } from 'src/application/dtos/contentReviewDto';
import { TeacherCreateDto } from 'src/application/dtos/teacherCreateDto';

@Injectable()
export class TeacherService {
  public async registerTeacher(teacher: TeacherCreateDto): Promise<Teacher> {
    // Find or create teacher
    return teacher as Teacher;
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
