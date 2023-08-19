export class UserService {
  public async registerUser(name: string, email: string): Promise<User> {
    const user = await this.userRepository.create({ name, email });
    return user;
  }
}
