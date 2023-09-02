import express from 'express';
import * as taskController from '../controllers/task.controller.js';
import * as validator from '../middlewares/validator.middleware.js';

const router = express.Router();

router.get('/', taskController.getAll);

router.post('/', validator.task, taskController.create);

router.put('/:id', validator.task, taskController.update);

router.delete('/:id', taskController.remove);

export default router;
