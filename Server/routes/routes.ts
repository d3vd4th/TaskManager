import { Router } from 'express';
import { createUser, loginUser, userdetails } from '../controllers/users'
import { createTask, deleteTasks, fetchTasks, updateTasks } from '../controllers/tasks';
import { verifyTokenMiddleware } from '../middleware/AuthVerification'
const routes = Router();
//users
routes.post('/createuser', createUser)
routes.post('/loginuser', loginUser)
routes.post('/userdetails', userdetails)
//tasks
routes.post('/createtask',verifyTokenMiddleware, createTask)
routes.get('/fetchtask', verifyTokenMiddleware, fetchTasks)
routes.post('/updatetask', updateTasks)
routes.post('/deletetask',verifyTokenMiddleware, deleteTasks)
// routes.post('/statusfilteration',priorityFilteration)

export default routes;