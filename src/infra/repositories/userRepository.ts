import { PrismaClient, User } from "@prisma/client";

export class UserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async create(user: User): Promise<any> {
    return await this.prismaClient.user.create({
      data: { ...user }
      },
    );
  }
}