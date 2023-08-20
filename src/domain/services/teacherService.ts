import { Inject, Injectable } from '@nestjs/common';
import { Content, ContentResult, Subject, Teacher } from '@prisma/client';
import { ContentCreateDto } from 'src/application/dtos/contentCreateDto';
import { ContentResultDto } from 'src/application/dtos/contentResultDto';
import { ContentReviewDto } from 'src/application/dtos/contentReviewDto';
import { TeacherCreateDto } from 'src/application/dtos/teacherCreateDto';
import { ContentGeneratorService } from 'src/domain/services/contentGeneratorService';
import { ContentRepositoryImpl } from 'src/infra/repositories/contentRepositoryImpl';
import { TeacherRepositoryImpl } from 'src/infra/repositories/teacherRepositoryImpl';
import * as fileHelper from 'src/domain/file/fileHelper';
import { ContentResultRepositoryImpl } from 'src/infra/repositories/contentResultRepositoryImpl';
import * as path from 'path';
import { ISubjectRepository } from 'src/domain/repositories/subjectRepository';

@Injectable()
export class TeacherService {
  constructor(
    private readonly teacherRepository: TeacherRepositoryImpl,
    private readonly contentRepository: ContentRepositoryImpl,
    private readonly contentResultRepository: ContentResultRepositoryImpl,
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
    const createdSubject = await this.createSubject(
      content.subject_id,
      content.title,
    );

    const createdContent = await this.createNewContent(content, createdSubject);

    const createdContentResults = await this.createContentResults(
      content.title,
      createdContent,
    );

    const contentResults = createdContentResults.map((contentResult) => ({
      id: contentResult.id,
      content_id: contentResult.content_id,
      level: contentResult.level,
      content: fileHelper.readFile(contentResult.filepath),
    }));

    return {
      contentResults,
    };
  }

  public async submitContentReview(review: ContentReviewDto): Promise<void> {
    // Submit content review
  }

  private async createSubject(
    subjectId: number,
    title: string,
  ): Promise<Subject> {
    const parentSubject = await this.subjectRepository.findByID(subjectId);
    let createdSubject;
    if (parentSubject) {
      createdSubject = await this.subjectRepository.findOrCreate({
        name: title,
        parent_id: parentSubject.id,
      });
      return parentSubject;
    }
    createdSubject = await this.subjectRepository.findOrCreate({
      name: title,
    });

    return createdSubject;
  }

  private async createNewContent(
    content: ContentCreateDto,
    createdSubject: Subject,
  ): Promise<Content> {
    const filepath = path.join(__dirname, 'files', `${content.title}.txt`);
    fileHelper.writeFile(filepath, content.content);
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
      },
      {
        level: 'expanded',
        filepath: expandedContentFilePath,
        content_id: createdContent.id,
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
}
