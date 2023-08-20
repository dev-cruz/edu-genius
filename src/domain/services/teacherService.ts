import { Inject, Injectable } from '@nestjs/common';
import { Content, ContentResult, Subject, Teacher } from '@prisma/client';
import { ContentCreateDto } from 'src/application/dtos/contentCreateDto';
import { ContentResultDto } from 'src/application/dtos/contentResultDto';
import { ContentReviewDto } from 'src/application/dtos/contentReviewDto';
import { TeacherCreateDto } from 'src/application/dtos/teacherCreateDto';
import { ContentGeneratorService } from 'src/domain/services/contentGeneratorService';
import * as fileHelper from 'src/domain/file/fileHelper';
import * as path from 'path';
import { ISubjectRepository } from 'src/domain/repositories/subjectRepository';
import { ITeacherRepository } from 'src/domain/repositories/teacherRepository';
import { IContentRepository } from 'src/domain/repositories/contentRepository';
import { IContentResultRepository } from 'src/domain/repositories/contentResultRepository';

@Injectable()
export class TeacherService {
  constructor(
    @Inject('TEACHER_REPOSITORY')
    private readonly teacherRepository: ITeacherRepository,
    @Inject('CONTENT_REPOSITORY')
    private readonly contentRepository: IContentRepository,
    @Inject('CONTENT_RESULT_REPOSITORY')
    private readonly contentResultRepository: IContentResultRepository,
    @Inject('SUBJECT_REPOSITORY')
    private readonly subjectRepository: ISubjectRepository,

    private readonly contentGeneratorService: ContentGeneratorService,
  ) { }

  public async registerTeacher(teacher: TeacherCreateDto): Promise<Teacher> {
    const createdTeacher =
      await this.teacherRepository.findOrCreateTeacher(teacher);
    return createdTeacher;
  }

  public async createContent(
    content: ContentCreateDto,
  ): Promise<ContentResultDto> {
    const subject = await this.getSubject(content.subject_id);

    const createdContent = await this.createNewContent(
      subject.name,
      content.content,
      subject,
    );

    const existingContentResults =
      await this.contentResultRepository.findByContentId(createdContent.id);

    if (existingContentResults.length > 0) {
      return this.parseContentResult(existingContentResults);
    }

    const createdContentResults = await this.createContentResults(
      subject.name,
      createdContent,
    );

    return this.parseContentResult(createdContentResults);
  }

  public async submitContentReview(review: ContentReviewDto): Promise<void> {
    const contentResult = await this.contentResultRepository.findByID(
      review.content_result_id,
    );

    if (!contentResult) {
      throw new Error('ContentResult not found');
    }

    await this.contentResultRepository.updateStatus(
      contentResult.id,
      review.status,
    );
  }

  private async getSubject(subjectId: number): Promise<Subject> {
    const subject = await this.subjectRepository.findByID(subjectId);
    return subject;
  }

  private async createNewContent(
    title: string,
    content: string,
    createdSubject: Subject,
  ): Promise<Content> {
    const filepath = path.join(__dirname, 'files', `${title}.txt`);
    fileHelper.writeFile(filepath, content);
    const contentToSave = {
      subject_id: createdSubject.id,
      filepath,
    };
    const createdContent =
      await this.contentRepository.saveOrUpdate(contentToSave);

    return createdContent;
  }

  private async createContentResults(
    title: string,
    createdContent: Content,
  ): Promise<ContentResult[]> {
    const text = fileHelper.readFile(createdContent.filepath);
    const simplifiedContentFilePath = await this.createContentResultFile(
      title,
      text,
      'simplified',
    );

    const expandedContentFilePath = await this.createContentResultFile(
      title,
      text,
      'expanded',
    );

    const createdContentResults = await this.contentResultRepository.saveMany([
      {
        level: 'simplified',
        filepath: simplifiedContentFilePath,
        content_id: createdContent.id,
        status: 'pending',
      },
      {
        level: 'expanded',
        filepath: expandedContentFilePath,
        content_id: createdContent.id,
        status: 'pending',
      },
    ]);

    return createdContentResults;
  }

  private async createContentResultFile(
    title: string,
    text: string,
    level: string,
  ): Promise<string> {
    const generatedText = await this.contentGeneratorService.generateContent(
      text,
      level,
    );

    const filePath = path.join(
      __dirname,
      'files',
      `${title}-contentResult-${level}.txt`,
    );
    fileHelper.writeFile(filePath, generatedText);

    return filePath;
  }

  private parseContentResult(
    contentResults: ContentResult[],
  ): ContentResultDto {
    return {
      contentResults: contentResults.map((contentResult) => ({
        id: contentResult.id,
        content_id: contentResult.content_id,
        content: fileHelper.readFile(contentResult.filepath),
        level: contentResult.level,
        status: contentResult.status,
      })),
    };
  }
}
