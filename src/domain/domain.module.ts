import { Module } from '@nestjs/common';
import { ContentGeneratorService } from 'src/domain/services/contentGeneratorService';
import { ContentService } from 'src/domain/services/contentService';
import { SubjectService } from 'src/domain/services/subjectService';
import { TeacherService } from 'src/domain/services/teacherService';
import { InfraModule } from 'src/infra/infra.module';

const services = [
  ContentGeneratorService,
  TeacherService,
  ContentService,
  SubjectService,
];

@Module({
  imports: [InfraModule],
  controllers: [],
  providers: [...services],
  exports: [...services, TeacherService, ContentService],
})
export class DomainModule {}
