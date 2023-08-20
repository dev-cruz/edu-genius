import { Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  ContentWithContentResult,
  IContentRepository,
} from 'src/domain/repositories/contentRepository';

export class ContentRepositoryImpl implements IContentRepository {
  constructor(@Inject(PrismaClient) private readonly prisma: PrismaClient) {}

  async save(content) {
    return this.prisma.content.create({ data: content });
  }

  async findBySubjectId(
    subjectId: number,
  ): Promise<ContentWithContentResult[]> {
    return this.prisma.content.findMany({
      include: {
        ContentResult: true,
      },
      where: {
        subject_id: subjectId,
      },
    });
  }
}
