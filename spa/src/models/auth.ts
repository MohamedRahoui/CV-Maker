import User from 'src/models/user'

export default interface Auth {
  token: string;
  user: User;
}
