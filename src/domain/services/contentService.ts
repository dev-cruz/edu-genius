import { Injectable } from '@nestjs/common';
import { GetContentsResultDto } from 'src/application/dtos/getContentsResultDto';

@Injectable()
export class ContentService {
  public async getContentsBySubject(
    subject_id: number,
  ): Promise<GetContentsResultDto> {
    // Get contents by subject
    return {} as GetContentsResultDto;
  }
}
