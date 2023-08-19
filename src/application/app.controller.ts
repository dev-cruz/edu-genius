import { Controller, Post, Get, Body } from '@nestjs/common';
import { TeacherCreateDto } from 'src/application/dtos/teacherCreateDto';
import { Teacher } from 'src/domain/entities/teacher.entity';
import { ContentCreateDto } from 'src/application/dtos/contentCreateDto';
import { ContentResultDto } from 'src/application/dtos/contentResultDto';
import { TeacherService } from 'src/domain/services/teacherService';

@Controller()
export class AppController {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly studentService: any,
  ) { }

  @Post('/register_teacher')
  async registerTeacher(@Body() teacher: TeacherCreateDto): Promise<Teacher> {
    return this.teacherService.registerTeacher(teacher);
  }

  @Post('/create_content')
  async createContent(
    @Body() content: ContentCreateDto,
  ): Promise<ContentResultDto> {
    return this.teacherService.createContent(content);
  }

  @Post('/submit_content_review')
  submitContentReview(@Body() review: any): string {
    this.teacherService.submitContentReview(review);
    return 'ok';
  }

  @Get('/get_contents_by_subject')
  getContentsBySubject(@Body() request: any): any {
    return this.studentService.getContentsBySubject(request.subject_id);
  }

  @Get('/list_subjects')
  listSubjects(): any {
    return this.studentService.listSubjects();
  }
}
