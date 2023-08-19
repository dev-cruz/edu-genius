import { Module } from '@nestjs/common';
import { AppController } from 'src/application/app.controller';
import { DomainModule } from 'src/domain/domain.module';

@Module({
  imports: [DomainModule],
  controllers: [AppController],
  providers: [],
})
export class ApplicationModule { }
