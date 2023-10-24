import mongoose, { Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}
const UserSchema = new mongoose.Schema<IUser>({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: 'visitor',
  },
});
const UserModel: Model<IUser> = mongoose.model<IUser>('users', UserSchema);
export default UserModel;
