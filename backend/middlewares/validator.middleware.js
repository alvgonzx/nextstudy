import { body } from 'express-validator';
import Classroom from '../models/Classroom.model.js';

export const classroom = [
	body('name').trim().notEmpty().withMessage('Name is required'),
	body('professor_name').trim().notEmpty().withMessage('Professor name is required'),
	body('professor_email')
		.optional()
		.if((value) => value !== '')
		.trim()
		.isEmail()
		.withMessage('Invalid email format')
];

export const exam = [
	body('name').trim().notEmpty().withMessage('Name is required'),
	body('date')
		.trim()
		.notEmpty()
		.withMessage('Date name is required')
		.isISO8601()
		.withMessage('Invalid day format')
		.toDate(),
	body('classroom_id')
		.trim()
		.notEmpty()
		.withMessage('Classroom id is required')
		.toInt()
		.isInt()
		.withMessage('Classroom id must be an integer')
		.custom(async (value) => {
			const classroom = await Classroom.findOne({
				where: { id: value }
			});
			if (!classroom) {
				return Promise.reject('Classroom does not exist');
			}
		}),
	body('mark')
		.optional()
		.if((value) => value !== '')
		.trim()
		.toInt()
		.isInt()
		.withMessage('Mark must be an integer')
];

export const task = [
	body('task').trim().notEmpty().withMessage('Task is required'),
	body('classroom_id')
		.trim()
		.notEmpty()
		.withMessage('Classroom id is required')
		.toInt()
		.isInt()
		.withMessage('Classroom id must be an integer')
		.custom(async (value) => {
			const classroom = await Classroom.findOne({
				where: { id: value }
			});
			if (!classroom) {
				return Promise.reject('Classroom does not exist');
			}
		}),
	body('completed')
		.notEmpty()
		.withMessage('Task status is required')
		.not()
		.isString()
		.withMessage('Task status must be a boolean')
		.isBoolean()
		.withMessage('Task status must be a boolean')
];

export const ai = [
	body('task').trim().notEmpty().withMessage('Task is required'),
	body('writing_style').trim().notEmpty().withMessage('Writing style is required')
];
