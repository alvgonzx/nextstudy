import BigCard from '@/components/dashboard/BigCard';
import SmallCard from '@/components/dashboard/SmallCard';

const getTasks = async () => {
	try {
		const res = await fetch('http://localhost:4000/tasks/', { cache: 'no-store' });
		if (!res.ok) {
			return { response_error: true };
		}

		return res.json();
	} catch (error) {
		return { response_error: true };
	}
};

const getExams = async () => {
	try {
		const res = await fetch('http://localhost:4000/exams/', { cache: 'no-store' });
		if (!res.ok) {
			return { response_error: true };
		}

		return res.json();
	} catch (error) {
		return { response_error: true };
	}
};

const HomePage = async () => {
	const tasks = await getTasks();
	const incompletedTasks = tasks.filter((task) => !task.completed);

	const exams = await getExams();
	const remainingExams = exams.filter((exam) => exam.mark === undefined || exam.mark === null);

	if (tasks.response_error || exams.response_error) {
		return (
			<p className="text-red-600">Could not load data, are you sure you are running the backend?</p>
		);
	}

	return (
		<>
			<p className="font-bold text-4xl">Welcome back, Álvaro</p>
			<section className="mt-5 flex gap-6">
				<BigCard number={incompletedTasks.length} text="Tasks remaining" />
				<BigCard number={remainingExams.length} text="Remaining exams" />
			</section>

			<p className="font-bold text-2xl mt-12">Active classrooms</p>
			<section className="mt-5 flex flex-row gap-6 flex-wrap">
				<SmallCard tasks={2} classroom="Maths" professor="John Doe" />
				<SmallCard tasks={2} classroom="Maths" professor="John Doe" />
				<SmallCard tasks={2} classroom="Maths" professor="John Doe" />
				<SmallCard tasks={2} classroom="Maths" professor="John Doe" />
				<SmallCard tasks={2} classroom="Maths" professor="John Doe" />
				<SmallCard tasks={2} classroom="Maths" professor="John Doe" />
				<SmallCard tasks={2} classroom="Maths" professor="John Doe" />
				<SmallCard tasks={2} classroom="Maths" professor="John Doe" />
				<SmallCard tasks={2} classroom="Maths" professor="John Doe" />
				<SmallCard tasks={2} classroom="Maths" professor="John Doe" />
			</section>
		</>
	);
};

export default HomePage;
