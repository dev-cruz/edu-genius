import { Module } from '@nestjs/common';
import { ContentGeneratorService } from 'src/domain/services/contentGeneratorService';
import { ContentService } from 'src/domain/services/contentService';
import { TeacherService } from 'src/domain/services/teacherService';
import { InfraModule } from 'src/infra/infra.module';

@Module({
  imports: [InfraModule],
  controllers: [],
  providers: [ContentGeneratorService, TeacherService, ContentService],
  exports: [TeacherService, ContentService],
})
export class DomainModule { }
