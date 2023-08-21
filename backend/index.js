import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import * as db from './database/database.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
	res.json({ message: 'ok' });
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

db.authenticate();
db.sequelize.sync();