import { Teacher } from '@prisma/client';

export interface ITeacherRepository {
  findOrCreateTeacher(teacher: Record<string, any>): Promise<Teacher>;
}
