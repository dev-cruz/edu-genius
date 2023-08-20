import { Module } from '@nestjs/common';
import { ContentGeneratorService } from 'src/domain/services/contentGeneratorService';
import { TeacherService } from 'src/domain/services/teacherService';

@Module({
  imports: [],
  controllers: [],
  providers: [ContentGeneratorService, TeacherService],
  exports: [TeacherService],
})
export class DomainModule { }
