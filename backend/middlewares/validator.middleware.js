import { body } from 'express-validator';

export const classroom = [
	body('name').notEmpty().withMessage('Name is required').trim(),
	body('professor_name').notEmpty().withMessage('Professor name is required'),
	body('professor_email').optional().trim().isEmail().withMessage('Invalid email format')
];
