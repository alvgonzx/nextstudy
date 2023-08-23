import { Classroom } from '../models/Classroom.model.js';
import { validationResult } from 'express-validator';

export const getAll = async (req, res) => {
	try {
		const classrooms = await Classroom.findAll();

		return res.status(200).json(classrooms);
	} catch (error) {
		console.error(error);
		return res.status(500).send('Internal server error');
	}
};

export const create = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const { name, professor_name, professor_email } = req.body;

		const classroom = await Classroom.create({ name, professor_name, professor_email });

		return res.status(200).json(classroom);
	} catch (error) {
		console.error(error);
		return res.status(500).send('Internal server error');
	}
};

export const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

	try {
		const { name, professor_name, professor_email } = req.body;

		const classroom = await Classroom.findByPk(req.params.id);

		if (classroom === null) {
			return res.status(404).send('Classroom not found');
		}

		await classroom.update({ name, professor_name, professor_email });
		return res.status(200).json(classroom);
	} catch (error) {
		console.error(error);
		return res.status(500).send('Internal server error');
	}
};

export const remove = async (req, res) => {
	try {
		const classroom = await Classroom.findByPk(req.params.id);

		if (classroom == null) {
			return res.status(404).send('Classroom not found');
		}

		await classroom.destroy();
		return res.status(200).send('Classroom successfully removed');
	} catch (error) {
		console.error(error);
		return res.status(500).send('Internal server error');
	}
};
