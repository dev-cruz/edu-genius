type Subject = {
  id: number;
  name: string;
  parent_id: number | null;
  children: Subject[];
};

export type SubjectListDto = {
  subjects: Subject[];
};
