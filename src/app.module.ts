import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAIService } from './opeani/openAIService';
import { OpenAIConfig } from './opeani/openAIConfig';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, OpenAIService, OpenAIConfig],
})
export class AppModule {}
