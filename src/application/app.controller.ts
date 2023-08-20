import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { TeacherCreateDto } from 'src/application/dtos/teacherCreateDto';
import { ContentCreateDto } from 'src/application/dtos/contentCreateDto';
import { ContentResultDto } from 'src/application/dtos/contentResultDto';
import { TeacherService } from 'src/domain/services/teacherService';
import { Subject, Teacher } from '@prisma/client';
import { ContentReviewDto } from 'src/application/dtos/contentReviewDto';
import { ContentService } from 'src/domain/services/contentService';
import { GetContentsResultDto } from 'src/application/dtos/getContentsResultDto';
import { SubjectService } from 'src/domain/services/subjectService';
import { SubjectCreateDto } from 'src/application/dtos/subjectCreateDto';

@Controller()
export class AppController {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly contentService: ContentService,
    private readonly subjectService: SubjectService,
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
  async submitContentReview(@Body() review: ContentReviewDto): Promise<string> {
    this.teacherService.submitContentReview(review);
    return 'ok';
  }

  @Post('/create_subject')
  async createSubject(
    @Body() subject: SubjectCreateDto,
  ): Promise<SubjectCreateDto> {
    return this.subjectService.create(subject);
  }

  @Get('/get_contents_by_subject/:subject_id')
  async getContentsBySubject(
    @Param('subject_id') subjectId: number,
  ): Promise<GetContentsResultDto> {
    return this.contentService.getContentsBySubject(Number(subjectId));
  }

  @Get('/list_subjects')
  async listSubjects(): Promise<Subject[]> {
    return this.subjectService.listSubjects();
  }

  @Get('/subject/:id')
  async getSubject(@Param('id') id: number): Promise<Subject> {
    return this.subjectService.findById(Number(id));
  }
}
