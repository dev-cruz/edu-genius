import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAIService } from './opeani/openAIService';
import { OpenAIConfig } from './opeani/openAIConfig';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, OpenAIService, OpenAIConfig],
})
export class AppModule {}
