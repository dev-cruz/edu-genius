import { Module } from '@nestjs/common';
import { AppController } from './application/app.controller';
import { AppService } from './application/app.service';
import { OpenAIService } from './openAI/openAIService';
import { OpenAIConfig } from './openAI/openAIConfig';
import { DomainModule } from 'src/domain/domain.module';

@Module({
  imports: [DomainModule],
  controllers: [AppController],
  providers: [AppService, OpenAIService, OpenAIConfig],
})
export class AppModule { }
