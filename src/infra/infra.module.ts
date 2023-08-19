import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenAIConfig } from 'src/openAI/openAIConfig';
import { OpenAIService } from 'src/openAI/openAIService';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [OpenAIService, OpenAIConfig],
})
export class InfraModule {}
