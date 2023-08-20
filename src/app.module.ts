import { Module } from '@nestjs/common';
import { AppController } from './application/app.controller';
import { OpenAIService } from './openAI/openAIService';
import { OpenAIConfig } from './openAI/openAIConfig';
import { DomainModule } from 'src/domain/domain.module';

@Module({
  imports: [DomainModule],
  controllers: [AppController],
  providers: [OpenAIService, OpenAIConfig],
})
export class AppModule { }
