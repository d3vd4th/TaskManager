import { Request, Response } from 'express';
import TaskModel, { ITask } from '../models/task';


export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id
    const { title, subtitle, tags, status, date } = req.body
    const task: ITask = await TaskModel.create({
      userId,
      title,
      subtitle,
      tags,
      status,
      date
    });
    console.log(task)
    res.send(task)
  }
  catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error')
  }
}

export const fetchTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id
    const task = await TaskModel.find({ userId: userId }).sort({ date: 1 })
    if (task.length > 0) {
      res.json(task);
    } else {
      res.json({ Status: "notask" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ Status: "error" });
  }
}

export const deleteTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { doc_id } = req.body
    if (!doc_id) {
      res.status(400).json({ error: 'doc_id is required' });
      return
    }
    const result = await TaskModel.findByIdAndRemove(doc_id);
    if (result) {
      res.status(200).json({ message: 'Document deleted successfully' });
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


export const updateTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { doc_id, title, subtitle, tags, status, date } = req.body
    if (!doc_id) {
      res.status(400).json({ error: 'doc_id is required' });
      return
    }
    const updatedtask = await TaskModel.findByIdAndUpdate(doc_id, { title: title, subtitle: subtitle, tags: tags, status: status, date: date }, { new: true })
    if (updatedtask) {
      res.status(200).json({ message: 'Document updated successfully', updatedtask });
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// export const priorityFilteration = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { status } = req.body
//     if (!status) {
//       res.status(400).json({ error: 'doc_id is required' });
//       return
//     }
//     const filteration = await TaskModel.find({ status: status })
//     if (filteration.length > 0) {
//       res.json(filteration);
//     } else {
//       res.json({ Status: "notask" });
//     }
//   } catch (error) {
//     console.error('Error on filtering document:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }

// }