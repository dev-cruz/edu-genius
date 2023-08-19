import { Module } from '@nestjs/common';
import { ContentGeneratorService } from 'src/domain/services/contentGeneratorService';

@Module({
  imports: [],
  controllers: [],
  providers: [ContentGeneratorService],
})
export class DomainModule { }
