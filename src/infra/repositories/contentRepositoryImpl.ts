import { Inject } from '@nestjs/common';
import { Content, PrismaClient } from '@prisma/client';
import {
  ContentWithContentResult,
  IContentRepository,
} from 'src/domain/repositories/contentRepository';

export class ContentRepositoryImpl implements IContentRepository {
  constructor(@Inject(PrismaClient) private readonly prisma: PrismaClient) { }

  async saveOrUpdate(content: {
    subject_id: number;
    filepath: string;
  }): Promise<Content> {
    const { subject_id, filepath } = content;
    const [foundContent] = await this.prisma.content.findMany({
      where: { subject_id },
    });

    if (foundContent) {
      const content = await this.prisma.content.update({
        where: {
          id: foundContent.id,
        },
        data: {
          filepath,
        },
      });
      return content;
    }

    return this.prisma.content.create({
      data: {
        subject_id,
        filepath,
      },
    });
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
