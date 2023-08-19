import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { Question } from 'src/domain/entitites/question.entity';
import { Subject } from 'src/domain/entitites/subject.entity';
import { User } from 'src/domain/entitites/user.entity';
import { QuestionFilters } from 'src/domain/repositories/questionRepository';
import { UserQuestionRegistry } from 'src/domain/repositories/userQuestionRepository';
import { QuestionService } from 'src/domain/services/questionService';
import { SubjectService } from 'src/domain/services/subjectService';
import { UserQuestionService } from 'src/domain/services/userQuestionService';
import { UserService } from 'src/domain/services/userService';

@Controller()
export class AppController {
  constructor(
    private userService: UserService,
    private subjectService: SubjectService,
    private questionService: QuestionService,
    private userQuestionService: UserQuestionService,
  ) { }

  @Post('/register_user')
  async registerUser(
    @Body() userParams: { name: string; email: string; universityId: number },
  ): Promise<User> {
    const user = new User(userParams);
    return this.userService.registerUser(user);
  }

  @Get('/subjects')
  async getSubjects(@Query('userId') userId: number): Promise<Subject[]> {
    return this.subjectService.getSubjectsForUser(userId);
  }

  @Post('/questions')
  async generateQuestions(
    @Body() request: QuestionFilters,
  ): Promise<Question[]> {
    return this.questionService.getByFilters(request);
  }

  @Post('/register_user_answers')
  async submitAnswers(
    @Body() userQuestions: { answers: UserQuestionRegistry[] },
  ): Promise<void> {
    await this.userQuestionService.registerUserQuestions(userQuestions.answers);
  }
}
