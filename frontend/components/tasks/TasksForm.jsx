'use client';
import { useEffect, useState } from 'react';
import LoadingIcon from '../LoadingIcon';

const TasksForm = () => {
	const [taskName, setTaskName] = useState('');
	const [classroomId, setClassroomId] = useState('');
	const [status, setStatus] = useState(false);

	const [classrooms, setClassrooms] = useState([]);
	const [tasks, setTasks] = useState([]);

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetch('http://localhost:4000/classrooms/')
			.then((response) => response.json())
			.then((classrooms) => {
				setClassrooms(classrooms);
				if (classrooms.length > 0) {
					setClassroomId(classrooms[0].id);
				}
			})
			.catch((error) => setError(<p className="text-red-600">Could not load data</p>));
		fetch('http://localhost:4000/tasks/')
			.then((response) => response.json())
			.then((tasks) => setTasks(tasks))
			.catch((error) => setError(<p className="text-red-600">Could not load data</p>));
	}, []);

	let classroomsSelect = [];
	classrooms.map((classroom) => {
		classroomsSelect.push({ value: classroom.id, label: classroom.name });
	});

	let icon = '';
	if (loading) {
		icon = <LoadingIcon />;
	}

	const getClassroomName = (classroomId) => {
		const classroom = classrooms.find((classroom) => classroom.id === classroomId);
		return classroom ? classroom.name : 'N/A';
	};

	const cleanInputs = () => {
		setTaskName('');
		if (classrooms.length > 0) {
			setClassroomId(classrooms[0].id);
		}
		setStatus('');
	};

	const handleDelete = async (id) => {
		await fetch(`http://localhost:4000/tasks/${id}`, {
			method: 'DELETE'
		}).catch((error) => setError(<p className="text-red-600">Could not load data</p>));
		const updatedTasks = tasks.filter((task) => task.id !== id);
		setTasks(updatedTasks);
	};

	const handleTaskNameChange = (event) => {
		setTaskName(event.target.value);
	};

	const handleClassroomIdChange = (event) => {
		setClassroomId(event.target.value);
	};

	const handleStatusChange = async (id, event) => {
		const completed = event.target.checked;

		const requestBody = {
			completed: completed
		};

		try {
			const response = await fetch(`http://localhost:4000/tasks/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestBody)
			});

			if (response.errors) {
				setError(<p className="text-red-600">Internal server error</p>);
			}

			const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, completed } : task));
			setTasks(updatedTasks);
		} catch (error) {
			setError(<p className="text-red-600">Internal server error</p>);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const requestBody = {
			task: taskName,
			classroom_id: classroomId
		};

		try {
			setLoading(true);
			const response = await fetch('http://localhost:4000/tasks/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestBody)
			}).catch((error) => setError(<p className="text-red-600">Could not load data</p>));

			const task = await response.json();

			if (task.errors) {
				setError(
					<p className="text-red-600">
						Your request has errors, make sure you have entered all fields
					</p>
				);
				console.error(task.errors);
				setLoading(false);
				return;
			}

			setTasks((prevTasks) => [...prevTasks, task]);
			setError('');
		} catch (error) {
			setError(<p className="text-red-600">Internal server error</p>);
		}

		setLoading(false);
		cleanInputs();
	};

	const completedTasks = tasks.filter((task) => task.completed);
	const notCompletedTasks = tasks.filter((task) => !task.completed);

	return (
		<>
			{error}
			<form onSubmit={handleSubmit}>
				<div className="flex gap-3 w-1/2">
					<div className="w-1/2">
						<div className="mt-3">
							<label htmlFor="task" className="block mb-1 text-sm font-medium text-gray-900">
								Task
							</label>
							<input
								required
								type="text"
								id="task"
								value={taskName}
								onChange={handleTaskNameChange}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
								placeholder="Your task"
							/>
						</div>
					</div>
					<div className="w-1/2">
						<div className="mt-3">
							<label
								htmlFor="classroom-id"
								className="block mb-1 text-sm font-medium text-gray-900"
							>
								Classroom
							</label>
							<select
								required
								value={classroomId}
								onChange={handleClassroomIdChange}
								id="classroom-id"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
							>
								{classroomsSelect.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
				<button
					disabled={loading}
					type="submit"
					className="mt-2 text-white bg-[#D14141] hover:bg-red-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
				>
					{icon}
					Submit
				</button>
			</form>
			<div className="relative overflow-x-auto border rounded-lg w-1/2 my-4">
				<table className="w-full text-sm text-left text-gray-500">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50">
						<tr>
							<th scope="col" className="px-6 py-3">
								Task
							</th>
							<th scope="col" className="px-6 py-3">
								Classroom
							</th>
							<th scope="col" className="px-6 py-3">
								Status
							</th>
							<th scope="col" className="px-6 py-3">
								<span className="sr-only">Delete</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{notCompletedTasks.map((task) => (
							<tr className="bg-white hover:bg-gray-50" key={task.id}>
								<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
									{task.task}
								</th>
								<td className="px-6 py-4">{getClassroomName(task.classroom_id)}</td>
								<td className="px-6 py-4">
									<input
										type="checkbox"
										checked={task.completed}
										onChange={(event) => handleStatusChange(task.id, event)}
									/>
								</td>
								<td className="px-6 py-4 text-center">
									<button
										className="font-medium text-red-600 hover:underline"
										onClick={() => handleDelete(task.id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
						{completedTasks.map((task) => (
							<tr className="bg-white hover:bg-gray-50" key={task.id}>
								<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
									{task.task}
								</th>
								<td className="px-6 py-4">{getClassroomName(task.classroom_id)}</td>
								<td className="px-6 py-4">
									<input
										type="checkbox"
										checked={task.completed}
										onChange={(event) => handleStatusChange(task.id, event)}
									/>
								</td>
								<td className="px-6 py-4 text-center">
									<button
										className="font-medium text-red-600 hover:underline"
										onClick={() => handleDelete(task.id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default TasksForm;
