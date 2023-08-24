"use client";
import { useState } from "react";
import LoadingIcon from "../LoadingIcon";

const writingStyles = [
    { value: "highschool", label: "High School" },
    { value: "middleschool", label: "Middle School" },
    { value: "university", label: "University" },
];

const HomeworkForm = () => {
    const [task, setTask] = useState("");
    const [writingStyle, setWritingStyle] = useState(writingStyles[0].value);
    const [response, setResponse] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    let icon = "";
    if (loading) {
        icon = <LoadingIcon />;
    }

    const handleTaskChange = (event) => {
        setTask(event.target.value);
    };

    const handleWritingStyleChange = (event) => {
        setWritingStyle(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestBody = {
            task: task,
            writing_style: writingStyle,
        };

        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const task = await response.json();

            if (task.errors) {
                setError(
                    <p className="text-red-600">
                        Your request has errors, make sure you have entered all
                        fields
                    </p>
                );
                setLoading(false);
                return;
            }

            setResponse(task.response);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {error}
            <form onSubmit={handleSubmit}>
                <div className="flex gap-3 w-2/3">
                    <div className="w-1/2">
                        <div className="mt-3">
                            <label
                                htmlFor="task"
                                className="block mb-1 text-sm font-medium text-gray-900"
                            >
                                Task
                            </label>
                            <input
                                required
                                type="text"
                                id="task"
                                value={task}
                                onChange={handleTaskChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Create an essay about..."
                            />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="mt-3">
                            <label
                                htmlFor="writing-style"
                                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Writing style
                            </label>
                            <select
                                required
                                value={writingStyle}
                                onChange={handleWritingStyleChange}
                                id="writing-style"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                {writingStyles.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
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
                <label
                    htmlFor="message"
                    className="block mt-4 mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Homework
                </label>
                <textarea
                    id="message"
                    rows="12"
                    value={response}
                    readOnly
                    className="block p-2.5 w-2/3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                    placeholder="Your homework will be here"
                ></textarea>
            </form>
        </>
    );
};

export default HomeworkForm;
