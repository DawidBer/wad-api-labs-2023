import express from 'express';
import { tasksData } from './tasksData';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();


//Get Task
router.get('/:id', (req, res) => {
    const { id } = req.params
    const task = tasksData.tasks.find(task => task.id === id);
    if (!task) {
        return res.status(404).json({ status: 404, message: 'Tasks not found'});
    }
    return res.status(200).json(task);
});

//Add Task
router.post('/', (req, res) => {
   // const created_at =  new Date().toISOString();
    //const updated_at = new Date().toISOString();
    const {title, description, deadline, priority, done} = req.body;
    const newTask = {
        id: uuidv4(),
        title,
        description,
        deadline,
        priority,
        done,
        created_at : new Date().toISOString(),
        updated_at : new Date().toISOString()
    };
    tasksData.tasks.push(newTask);
    res.status(201).json(newTask);
    tasksData.total_results++;
});

//Update existing task
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasksData.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ status: 404, message: 'Task not found' });
    }

    console.log('Original Task:', tasksData.tasks[taskIndex]);

    const created_at = tasksData.tasks[taskIndex].created_at;

    const updatedTask = { ...tasksData.tasks[taskIndex], ...req.body, id:id, created_at: created_at, updated_at: new Date().toISOString()};
    tasksData.tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
    console.log('Updated Task:', updatedTask);
});


//Delete Task
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasksData.tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) return res.status(404).json({status: 404, message: 'Task not found'});
    tasksData.tasks.splice(taskIndex, 1);
    res.status(204).send();
    tasksData.total_results--;
});

export default router;