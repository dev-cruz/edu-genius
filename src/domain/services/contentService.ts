import { Inject, Injectable } from '@nestjs/common';
import { ContentResult } from '@prisma/client';
import { GetContentsResultDto } from 'src/application/dtos/getContentsResultDto';
import { readFileAsync } from 'src/domain/file/fileHelper';
import { IContentRepository } from 'src/domain/repositories/contentRepository';

@Injectable()
export class ContentService {
  constructor(
    @Inject('CONTENT_REPOSITORY')
    private readonly contentRepository: IContentRepository,
  ) { }

  public async getContentsBySubject(
    subject_id: number,
  ): Promise<GetContentsResultDto> {
    const [content] = await this.contentRepository.findBySubjectId(subject_id);
    if (!content) {
      return null;
    }

    const { id, filepath, ContentResult } = content;
    const contentResultsfiles = ContentResult.map(({ filepath }) => filepath);

    const [originalContentText, ...contentResultTexts] =
      await this.readAllFiles(filepath, contentResultsfiles);

    const contentsResults = this.buildContentResult(
      ContentResult,
      contentResultTexts,
    );

    const result = {
      originalContent: {
        id,
        content: originalContentText,
      },
      contentsResults,
    };

    return result;
  }

  private async readAllFiles(
    contentFile: string,
    contentResultsfiles: string[],
  ) {
    return Promise.all([
      this.readFile(contentFile),
      ...contentResultsfiles.map((filepath) => this.readFile(filepath)),
    ]);
  }

  private buildContentResult(
    contentResult: ContentResult[],
    contentResultTexts: string[],
  ) {
    return contentResult
      .map(({ id, level, status }, index) => {
        return {
          id,
          level,
          status,
          content: contentResultTexts[index],
        };
      })
      .filter(({ status }) => status === 'approved');
  }

  private async readFile(filename) {
    return readFileAsync(filename);
  }
}
