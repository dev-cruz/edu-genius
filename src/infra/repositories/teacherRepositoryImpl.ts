import { PrismaClient, Teacher } from '@prisma/client';
import { ITeacherRepository } from 'src/domain/repositories/teacherRepository';

export class TeacherRepositoryImpl implements ITeacherRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findOrCreateTeacher(teacher: {
    name: string;
    email: string;
  }): Promise<Teacher> {
    const { email } = teacher;
    const [foundTeacher] = await this.prisma.teacher.findMany({
      where: { email },
    });

    if (foundTeacher) {
      return foundTeacher;
    }

    const createdTeacher = await this.prisma.teacher.create({
      data: teacher,
    });

    return createdTeacher;
  }
}
