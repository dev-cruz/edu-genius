export interface IUserRepository {
  create(name: string, email: string): Promise<User>;
}
