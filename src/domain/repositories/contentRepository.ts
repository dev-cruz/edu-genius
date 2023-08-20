import { Content, ContentResult } from '@prisma/client';

export type ContentWithContentResult = Content & {
  ContentResult: ContentResult[];
};

export interface IContentRepository {
  findBySubjectId(subjectId: number): Promise<ContentWithContentResult[]>;
  saveOrUpdate(content: {
    subject_id: number;
    filepath: string;
  }): Promise<Content>;
}
