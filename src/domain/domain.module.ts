import { Module } from '@nestjs/common';
import { QuestionService } from 'src/domain/services/questionService';
import { SubjectService } from 'src/domain/services/subjectService';
import { UserQuestionService } from 'src/domain/services/userQuestionService';
import { UserService } from 'src/domain/services/userService';

@Module({
  providers: [
    QuestionService,
    SubjectService,
    UserQuestionService,
    UserService,
  ],
  exports: [QuestionService, SubjectService, UserQuestionService, UserService],
})
export class DomainModule { }
