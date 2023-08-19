import { University } from './university.entity';

export class User {
  public id: number;
  public name: string;
  public email: string;
  public universityId: number;
  public univesrity: University;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }
}
