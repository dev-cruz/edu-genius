import { Inject, Injectable } from '@nestjs/common';
import { ContentResult } from '@prisma/client';
import { GetContentsResultDto } from 'src/application/dtos/getContentsResultDto';
import { readFileAsync } from 'src/domain/file/fileHelper';
import { IContentRepository } from 'src/domain/repositories/contentRepository';

@Injectable()
export class ContentService {
  constructor(
    @Inject() private readonly contentRepository: IContentRepository,
  ) {}

  public async getContentsBySubject(
    subject_id: number,
  ): Promise<GetContentsResultDto> {
    const [content] = await this.contentRepository.findBySubjectId(subject_id);
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
        subject_id,
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
    return contentResult.map(({ id, level }, index) => {
      return {
        id,
        level,
        content: contentResultTexts[index],
      };
    });
  }

  private async readFile(filename) {
    return readFileAsync(filename);
  }
}
