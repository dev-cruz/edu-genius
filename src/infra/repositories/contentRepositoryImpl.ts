import { Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IContentRepository } from 'src/domain/repositories/contentRepository';

export class ContentRepositoryImpl implements IContentRepository {
  constructor(@Inject(PrismaClient) private readonly prisma: PrismaClient) { }

  async save(content) {
    return this.prisma.content.create({ data: content });
  }
}
