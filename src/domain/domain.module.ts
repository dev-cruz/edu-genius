import { Module } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { QuestionService } from 'src/domain/services/questionService';
import { SubjectService } from 'src/domain/services/subjectService';
import { UserQuestionService } from 'src/domain/services/userQuestionService';
import { UserService } from 'src/domain/services/userService';
import { OpenAIConfig } from 'src/opeani/openAIConfig';
import { OpenAIService } from 'src/opeani/openAIService';

@Module({
  imports: [],
  providers: [
    QuestionService,
    SubjectService,
    UserQuestionService,
    UserService,
    OpenAIService,
    OpenAIConfig
  ],
  exports: [QuestionService, SubjectService, UserQuestionService, UserService],
})
export class DomainModule { }
