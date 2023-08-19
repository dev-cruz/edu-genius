import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

type RegisterUserRequest = {
  email: string;
  universityId: number;
};

type UserResponse = {
  id: number;
  email: string;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/register_user')
  registerUser(@Body() body: RegisterUserRequest): UserResponse {
    return this.appService.registerUser(body);
  }
}
