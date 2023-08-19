import { Injectable } from '@nestjs/common';
import { ContentCreateDto } from 'src/application/dtos/contentCreateDto';
import { ContentResultDto } from 'src/application/dtos/contentResultDto';
import { TeacherCreateDto } from 'src/application/dtos/teacherCreateDto';
import { Teacher } from 'src/domain/entities/teacher.entity';

@Injectable()
export class TeacherService {
  public async registerTeacher(teacher: TeacherCreateDto): Promise<Teacher> {
    const teacherEntity = new Teacher(teacher);
    // Find or create teacher
    return teacherEntity;
  }

  public async createContent(
    content: ContentCreateDto,
  ): Promise<ContentResultDto> {
    // Create content
    // Create content results via OpenAI
    return content;
  }
}
