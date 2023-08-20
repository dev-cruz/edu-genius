import { Injectable } from '@nestjs/common';
import { GetContentsResultDto } from 'src/application/dtos/getContentsResultDto';
import { SubjectListDto } from 'src/application/dtos/subjectListDto';

@Injectable()
export class ContentService {
  public async getContentsBySubject(
    subject_id: string,
  ): Promise<GetContentsResultDto> {
    // Get contents by subject
    return {} as GetContentsResultDto;
  }

  public async listSubjects(): Promise<SubjectListDto> {
    // List subjects
    return {} as SubjectListDto;
  }
}
