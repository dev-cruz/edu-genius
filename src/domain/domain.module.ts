import { Module } from '@nestjs/common';
import { TeacherService } from 'src/domain/services/teacherService';

@Module({
  providers: [TeacherService],
  exports: [TeacherService],
})
export class DomainModule { }
