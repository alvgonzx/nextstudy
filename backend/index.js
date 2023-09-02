import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import * as db from './database/database.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
	res.json({ message: 'ok' });
});

import aiRouter from './routes/ai.router.js';
import classroomsRouter from './routes/classrooms.router.js';
import examsRouter from './routes/exams.router.js';
import tasksRouter from './routes/tasks.router.js';

app.use('/ai', aiRouter);
app.use('/classrooms', classroomsRouter);
app.use('/exams', examsRouter);
app.use('/tasks', tasksRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

db.authenticate();
db.sequelize.sync();
import './models/associations.js';