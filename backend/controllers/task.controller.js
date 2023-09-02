import Task from "../models/Task.model.js";
import { validationResult } from "express-validator";

export const getAll = async (req, res) => {
	try {
		const tasks = await Task.findAll();

		return res.status(200).json(tasks);
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
		const { task, classroom_id, completed } = req.body;

		const taskModel = await Task.create({ task, classroom_id, completed });

		return res.status(200).json(taskModel);
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
		const { task, classroom_id, completed } = req.body;

		const taskModel = await Task.findByPk(req.params.id);

		if (taskModel === null) {
			return res.status(404).send('Task not found');
		}

		await taskModel.update({ task, classroom_id, completed });
		return res.status(200).json(taskModel);
	} catch (error) {
		console.error(error);
		return res.status(500).send('Internal server error');
	}
};

export const remove = async (req, res) => {
	try {
		const taskModel = await Task.findByPk(req.params.id);

		if (taskModel == null) {
			return res.status(404).send('Task not found');
		}

		await taskModel.destroy();
		return res.status(200).send('Task successfully removed');
	} catch (error) {
		console.error(error);
		return res.status(500).send('Internal server error');
	}
};
