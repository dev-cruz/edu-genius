import { Content, ContentResult } from '@prisma/client';

export type ContentWithContentResult = Content & {
  ContentResult: ContentResult[];
};

export interface IContentRepository {
  save(content: Record<string, any>): Promise<Content>;
  findBySubjectId(subjectId: number): Promise<ContentWithContentResult[]>;
}
