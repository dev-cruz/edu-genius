import { ContentResult } from '@prisma/client';

export interface IContentResultRepository {
  saveMany(contentResults: Record<string, any>[]): Promise<ContentResult[]>;
}
