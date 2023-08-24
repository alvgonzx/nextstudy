import dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';

export const requestAI = async (system, prompt) => {
	const openai = new OpenAI({
		apiKey: process.env.OPENAI_API_KEY
	});

	const completion = await openai.chat.completions.create({
		messages: [
			{ role: 'system', content: system },
			{ role: 'user', content: prompt }
		],
		model: 'gpt-3.5-turbo',
		max_tokens: 2048
	});

	return completion.choices[0].message.content;
};
