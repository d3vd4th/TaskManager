import mongoose, { Document, Model } from 'mongoose';

export interface ITask extends Document {
  userId:string
  title: string;
  subtitle: string;
  tags: string;
  status: string;
  date:Date
}
const TaskSchema = new mongoose.Schema<ITask>({
  userId: String,
  title: String,
  subtitle: String,
  tags: String,
  status: String,
  date: Date
});
const TaskModel: Model<ITask> = mongoose.model<ITask>('Tasks', TaskSchema);
export default TaskModel;