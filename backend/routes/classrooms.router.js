import express from 'express';
import * as classroomController from '../controllers/classroom.controller.js';

const router = express.Router();

router.get('/', classroomController.getAll);

router.post('/', classroomController.create)

router.put('/:id', classroomController.update)

router.delete('/:id', classroomController.remove)

export default router;
