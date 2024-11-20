export interface IUser extends Document {
    _id:string,
    username: string;
    password: string;
    isValidPassword(password: string): Promise<boolean>;
  }