import { User } from 'src/domain/entitites/user.entity';

export class UserService {
  public async registerUser(userToRegister: User): Promise<User> {
    // const user = await this.userRepository.findOrCreate(userToRegister);
    return null;
  }
}
