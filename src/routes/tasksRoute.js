import express from 'express';
import Tasks from '../controllers/TasksController';

const router = express.Router();

// get all tasks
router.get('/tasks', Tasks.allTasks);

// create task
router.post('/tasks', Tasks.create);

// update task by id
router.put('/tasks/:id', Tasks.update);

// delete task by id
router.delete('/tasks/:id', Tasks.delete);

export default router;