import { Content } from '@prisma/client';

export interface IContentRepository {
  save(content: Record<string, any>): Promise<Content>;
}
