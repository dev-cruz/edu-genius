import { Inject } from '@nestjs/common';
import { ContentResult, PrismaClient } from '@prisma/client';
import { IContentResultRepository } from 'src/domain/repositories/contentResultRepository';

export class ContentResultRepositoryImpl implements IContentResultRepository {
  constructor(@Inject(PrismaClient) private readonly prisma: PrismaClient) { }

  async saveMany(
    contentResults: { level: string; filepath: string; content_id: number }[],
  ): Promise<ContentResult[]> {
    await this.prisma.contentResult.createMany({
      data: contentResults as any,
      skipDuplicates: true,
    });

    const createdContentResults = await this.prisma.contentResult.findMany({
      where: {
        OR: contentResults,
      },
    });

    return createdContentResults;
  }

  async findByContentId(content_id: number): Promise<ContentResult[]> {
    return this.prisma.contentResult.findMany({
      where: {
        content_id,
      },
    });
  }
}
