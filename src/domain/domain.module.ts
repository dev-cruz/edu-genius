import { Module } from '@nestjs/common';
import { ContentGeneratorService } from 'src/domain/services/contentGeneratorService';
import { InfraModule } from 'src/infra/infra.module';

@Module({
  imports: [InfraModule],
  controllers: [],
  providers: [ContentGeneratorService],
})
export class DomainModule {}
