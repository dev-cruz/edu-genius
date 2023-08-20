import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { ContentRepositoryImpl } from 'src/infra/repositories/contentRepositoryImpl';
import { ContentResultRepositoryImpl } from 'src/infra/repositories/contentResultRepositoryImpl';
import { SubjectRepositoryImpl } from 'src/infra/repositories/subjectRepositoryImpl';
import { TeacherRepositoryImpl } from 'src/infra/repositories/teacherRepositoryImpl';
import { OpenAIConfig } from 'src/openAI/openAIConfig';
import { OpenAIService } from 'src/openAI/openAIService';

const repositories = [
  { provide: 'TEACHER_REPOSITORY', useClass: TeacherRepositoryImpl },
  { provide: 'SUBJECT_REPOSITORY', useClass: SubjectRepositoryImpl },
  { provide: 'CONTENT_REPOSITORY', useClass: ContentRepositoryImpl },
  {
    provide: 'CONTENT_RESULT_REPOSITORY',
    useClass: ContentResultRepositoryImpl,
  },
];

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [...repositories, OpenAIService, OpenAIConfig, PrismaClient],
  exports: [...repositories, OpenAIService],
})
export class InfraModule { }
