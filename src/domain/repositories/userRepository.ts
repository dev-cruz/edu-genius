import { User } from 'src/domain/entitites/user.entity';

export interface IUserRepository {
  findOrCreate(user: User): Promise<User>;
}
