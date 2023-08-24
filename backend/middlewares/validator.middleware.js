import { body } from 'express-validator';

export const classroom = [
	body('name').notEmpty().withMessage('Name is required').trim(),
	body('professor_name').notEmpty().withMessage('Professor name is required'),
	body('professor_email').optional().if(value => value !== '') .trim().isEmail().withMessage('Invalid email format')
];

export const ai = [
	body('task').notEmpty().withMessage('Task is required').trim(),
	body('writing_style').notEmpty().withMessage('Writing style is required').trim()
];
