export type GetContentsResultDto = {
  originalContent: {
    id: number;
    content: string;
  };
  contentsResults: {
    id: number;
    content: string;
    level: string;
  }[];
};
