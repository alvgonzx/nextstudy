import Exam from "../models/Exam.model.js";
import { validationResult } from "express-validator";

export const getAll = async (req, res) => {
	try {
		const exams = await Exam.findAll();

		return res.status(200).json(exams);
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
		const { name, date, classroom_id, mark } = req.body;

		const exam = await Exam.create({ name, date, classroom_id, mark });

		return res.status(200).json(exam);
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
		const { name, date, classroom_id, mark } = req.body;

		const exam = await Exam.findByPk(req.params.id);

		if (exam === null) {
			return res.status(404).send('Exam not found');
		}

		await exam.update({ name, date, classroom_id, mark });
		return res.status(200).json(exam);
	} catch (error) {
		console.error(error);
		return res.status(500).send('Internal server error');
	}
};

export const remove = async (req, res) => {
	try {
		const exam = await Exam.findByPk(req.params.id);

		if (exam == null) {
			return res.status(404).send('Exam not found');
		}

		await exam.destroy();
		return res.status(200).send('Exam successfully removed');
	} catch (error) {
		console.error(error);
		return res.status(500).send('Internal server error');
	}
};
