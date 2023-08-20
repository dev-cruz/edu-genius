import { PrismaClient } from '@prisma/client';
import { IContentRepository } from 'src/domain/repositories/contentRepository';

export class ContentRepositoryImpl implements IContentRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(content) {
    return this.prisma.content.create({ data: content });
  }
}
