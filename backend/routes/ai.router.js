import express from 'express';
import * as aiController from '../controllers/ai.controller.js';
import * as validator from '../middlewares/validator.middleware.js';

const router = express.Router();

router.post('/', validator.ai, aiController.getReponse);

export default router;
