'use client';
import { useEffect, useState } from 'react';
import LoadingIcon from '../LoadingIcon';

const ExamsForm = () => {
	const [name, setName] = useState('');
	const [date, setDate] = useState('');
	const [classroomId, setClassroomId] = useState('');
	const [mark, setMark] = useState(null);

	const [classrooms, setClassrooms] = useState([]);
	const [exams, setExams] = useState([]);

	const [isEditing, setIsEditing] = useState(null);
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
		fetch('http://localhost:4000/exams/')
			.then((response) => response.json())
			.then((exams) => setExams(exams))
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
		setName('');
		setDate('');
		if (classrooms.length > 0) {
			setClassroomId(classrooms[0].id);
		}
		setMark('');
	};

	const handleDelete = async (id) => {
		await fetch(`http://localhost:4000/exams/${id}`, {
			method: 'DELETE'
		}).catch((error) => setError(<p className="text-red-600">Could not load data</p>));
		const updatedExams = exams.filter((exam) => exam.id !== id);
		setExams(updatedExams);
	};

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleDateChange = (event) => {
		setDate(event.target.value);
	};

	const handleClassroomIdChange = (event) => {
		setClassroomId(event.target.value);
	};

	const handleMarkChange = (event) => {
		setMark(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const requestBody = {
			name: name,
			date: date,
			classroom_id: classroomId,
			mark: mark ? mark : ''
		};

		try {
			setLoading(true);
			const response = await fetch('http://localhost:4000/exams/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestBody)
			}).catch((error) => setError(<p className="text-red-600">Could not load data</p>));

			const exam = await response.json();

			if (exam.errors) {
				setError(
					<p className="text-red-600">
						Your request has errors, make sure you have entered a correct date
					</p>
				);
				setLoading(false);
				return;
			}

			setExams((prevExams) => [...prevExams, exam]);
			setError('');
		} catch (error) {
			setError(<p className="text-red-600">Internal server error</p>);
		}
		setLoading(false);
		cleanInputs();
	};

	const handleEditClick = (id) => {
		setIsEditing(id);

		const editedIndex = exams.findIndex((exam) => exam.id === id);

		const exam = exams[editedIndex];

		setName(exam.name);
		setDate(exam.date);
		setClassroomId(exam.classroom_id);
		mark !== null ? setMark(exam.mark) : '';
	};

	const handleEditSubmit = async (event) => {
		event.preventDefault();

		const requestBody = {
			name: name,
			date: date,
			classroom_id: classroomId,
			mark: mark ? mark : ''
		};

		try {
			setLoading(true);
			const response = await fetch(`http://localhost:4000/exams/${isEditing}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestBody)
			}).catch((error) => setError(<p className="text-red-600">Could not load data</p>));

			const exam = await response.json();

			if (exam.errors) {
				setError(
					<p className="text-red-600">
						Your request has errors, make sure you have entered a correct date
					</p>
				);
				setLoading(false);
				return;
			}

			const updatedExams = [...exams];
			const editedIndex = updatedExams.findIndex((exam) => exam.id === isEditing);
			updatedExams[editedIndex] = exam;
			setExams(updatedExams);
			setError('');
		} catch (error) {
			setError(<p className="text-red-600">Internal server error</p>);
		}

		setIsEditing(null);
		setLoading(false);
		cleanInputs();
	};

	return (
		<>
			{error}
			<form onSubmit={isEditing ? handleEditSubmit : handleSubmit}>
				<div className="flex gap-3 w-2/3">
					<div className="w-1/4">
						<div className="mt-3">
							<label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900">
								Name
							</label>
							<input
								required
								type="text"
								id="name"
								value={name}
								onChange={handleNameChange}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
								placeholder="Your exam name"
							/>
						</div>
					</div>
					<div className="w-1/4">
						<div className="mt-3">
							<label htmlFor="date" className="block mb-1 text-sm font-medium text-gray-900">
								Date
							</label>
							<input
								required
								type="text"
								id="date"
								value={date}
								onChange={handleDateChange}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
								placeholder="2023-07-24"
							/>
						</div>
					</div>
					<div className="w-1/4">
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
					<div className="w-1/4">
						<div className="mt-3">
							<label htmlFor="mark" className="block mb-1 text-sm font-medium text-gray-900">
								Mark
							</label>
							<input
								type="number"
								id="mark"
								value={mark !== null ? mark : ''}
								onChange={handleMarkChange}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
								placeholder="Your mark"
							/>
						</div>
					</div>
				</div>
				<button
					disabled={loading}
					type="submit"
					className="mt-2 text-white bg-[#D14141] hover:bg-red-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
				>
					{icon}
					{isEditing ? 'Edit' : 'Submit'}
				</button>
			</form>

			<div className="relative overflow-x-auto border rounded-lg w-2/3 my-4">
				<table className="w-full text-sm text-left text-gray-500">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50">
						<tr>
							<th scope="col" className="px-6 py-3">
								Exam name
							</th>
							<th scope="col" className="px-6 py-3">
								Exam date
							</th>
							<th scope="col" className="px-6 py-3">
								Exam classroom
							</th>
							<th scope="col" className="px-6 py-3">
								Exam mark
							</th>
							<th scope="col" className="px-6 py-3">
								<span className="sr-only">Edit</span>
							</th>
							<th scope="col" className="px-6 py-3">
								<span className="sr-only">Delete</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{exams.map((exam) => (
							<tr className="bg-white hover:bg-gray-50" key={exam.id}>
								<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
									{exam.name}
								</th>
								<td className="px-6 py-4">{exam.date}</td>
								<td className="px-6 py-4">{getClassroomName(exam.classroom_id)}</td>
								<td className="px-6 py-4">
									{exam.mark !== null && exam.mark !== undefined && exam.mark !== ''
										? exam.mark
										: 'Not added'}
								</td>
								<td className="px-6 py-4 text-right">
									<button
										className="font-medium text-blue-600 hover:underline"
										onClick={() => handleEditClick(exam.id)}
									>
										Edit
									</button>
								</td>
								<td className="px-6 py-4 text-right">
									<button
										className="font-medium text-red-600 hover:underline"
										onClick={() => handleDelete(exam.id)}
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

export default ExamsForm;
