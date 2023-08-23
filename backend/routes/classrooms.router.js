import express from 'express';
import * as classroomController from '../controllers/classroom.controller.js';
import * as validator from '../middlewares/validator.middleware.js';

const router = express.Router();

router.get('/', classroomController.getAll);

router.post('/', validator.classroom, classroomController.create);

router.put('/:id', validator.classroom, classroomController.update);

router.delete('/:id', classroomController.remove);

export default router;
