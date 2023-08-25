import express from 'express';
import * as examController from '../controllers/exam.controller.js';
import * as validator from '../middlewares/validator.middleware.js';

const router = express.Router();

router.get('/', examController.getAll);

router.post('/', validator.exam, examController.create);

router.put('/:id', validator.exam, examController.update);

router.delete('/:id', examController.remove);

export default router;
