export type ContentResultDto = {
  contentResults: {
    id: number;
    content_id: number;
    content: string;
    level: string;
    status?: string;
  }[];
};
