import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAIService } from './opeani/openAIService';
import { OpenAIConfig } from './opeani/openAIConfig';
import { DomainModule } from 'src/domain/domain.module';

@Module({
  imports: [ConfigModule.forRoot(), DomainModule],
  controllers: [AppController],
  providers: [AppService, OpenAIService, OpenAIConfig],
})
export class AppModule { }
