import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ContentRepositoryImpl } from 'src/infra/repositories/contentRepositoryImpl';
import { ContentResultRepositoryImpl } from 'src/infra/repositories/contentResultRepositoryImpl';
import { SubjectRepositoryImpl } from 'src/infra/repositories/subjectRepositoryImpl';
import { TeacherRepositoryImpl } from 'src/infra/repositories/teacherRepositoryImpl';
import { OpenAIConfig } from 'src/openAI/openAIConfig';
import { OpenAIService } from 'src/openAI/openAIService';

const repositories = [
  TeacherRepositoryImpl,
  SubjectRepositoryImpl,
  ContentRepositoryImpl,
  ContentResultRepositoryImpl,
];

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [OpenAIService, OpenAIConfig],
  exports: [...repositories, OpenAIService],
})
export class InfraModule {}
