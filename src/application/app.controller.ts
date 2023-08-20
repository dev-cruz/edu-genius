import { Controller, Post, Get, Body } from '@nestjs/common';
import { TeacherCreateDto } from 'src/application/dtos/teacherCreateDto';
import { ContentCreateDto } from 'src/application/dtos/contentCreateDto';
import { ContentResultDto } from 'src/application/dtos/contentResultDto';
import { TeacherService } from 'src/domain/services/teacherService';
import { Subject, Teacher } from '@prisma/client';
import { ContentReviewDto } from 'src/application/dtos/contentReviewDto';
import { ContentService } from 'src/domain/services/contentService';
import { getContentsBySubjectDto } from 'src/application/dtos/getContentDto';
import { GetContentsResultDto } from 'src/application/dtos/getContentsResultDto';
import { SubjectService } from 'src/domain/services/subjectService';
import { SubjectCreateDto } from 'src/application/dtos/subjectCreateDto';

@Controller()
export class AppController {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly contentService: ContentService,
    private readonly subjectService: SubjectService,
  ) {}

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
  async submitContentReview(@Body() review: ContentReviewDto): Promise<string> {
    this.teacherService.submitContentReview(review);
    return 'ok';
  }

  @Post('/create_subject')
  async createSubject(@Body() subject: SubjectCreateDto): Promise<string> {
    this.subjectService.create(subject);
    return 'ok';
  }

  @Get('/get_contents_by_subject')
  async getContentsBySubject(
    @Body() request: getContentsBySubjectDto,
  ): Promise<GetContentsResultDto> {
    return this.contentService.getContentsBySubject(request.subject_id);
  }

  @Get('/list_subjects')
  async listSubjects(): Promise<Subject[]> {
    return this.subjectService.listSubjects();
  }
}
