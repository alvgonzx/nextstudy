"use client";
import { useEffect, useState } from "react";
import LoadingIcon from "../LoadingIcon";

const HomeworkForm = () => {
    const [name, setName] = useState("");
    const [professorName, setProfessorName] = useState("");
    const [professorEmail, setProfessorEmail] = useState("");
    const [classrooms, setClassrooms] = useState([]);

    const [isEditing, setIsEditing] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("http://localhost:4000/classrooms/")
            .then((response) => response.json())
            .then((classrooms) => setClassrooms(classrooms));
    }, []);

    const handleDelete = async (id) => {
        await fetch(`http://localhost:4000/classrooms/${id}`, {
            method: "DELETE",
        });
        const updatedClassrooms = classrooms.filter(
            (classroom) => classroom.id !== id
        );
        setClassrooms(updatedClassrooms);
    };

    let icon = "";
    if (loading) {
        icon = <LoadingIcon />;
    }

    const cleanInputs = () => {
        setName("")
        setProfessorName("")
        setProfessorEmail("")
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleProfessorNameChange = (event) => {
        setProfessorName(event.target.value);
    };

    const handleProfessorEmailChange = (event) => {
        setProfessorEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let requestBody;
        if (!professorEmail) {
            requestBody = {
                name: name,
                professor_name: professorName,
                professor_email: "",
            };
        } else {
            requestBody = {
                name: name,
                professor_name: professorName,
                professor_email: professorEmail ? professorEmail : "",
            };
        }

        try {
            setLoading(true);
            const response = await fetch("http://localhost:4000/classrooms/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const classroom = await response.json();

            if (classroom.errors) {
                setError(
                    <p className="text-red-600">
                        Your request has errors, make sure you have entered a
                        valid email
                    </p>
                );
                setLoading(false);
                return;
            }

            setClassrooms((prevClassrooms) => [...prevClassrooms, classroom]);
            setError("");
        } catch (error) {
            setError(<p className="text-red-600">Internal server error</p>);
            console.error(error);
        }
        setLoading(false);
        cleanInputs();
    };

    const handleEditClick = (id) => {
        setIsEditing(id);

        const editedIndex = classrooms.findIndex(
            (classroom) => classroom.id === id
        );
        
        const classroom = classrooms[editedIndex]

        setName(classroom.name);
        setProfessorName(classroom.professor_name);
        setProfessorEmail(classroom.professor_email);
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();

        let requestBody;
        if (!professorEmail) {
            requestBody = {
                name: name,
                professor_name: professorName,
                professor_email: "",
            };
        } else {
            requestBody = {
                name: name,
                professor_name: professorName,
                professor_email: professorEmail ? professorEmail : "",
            };
        }

        try {
            setLoading(true);
            const response = await fetch(
                `http://localhost:4000/classrooms/${isEditing}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            const classroom = await response.json();

            if (classroom.errors) {
                setError(
                    <p className="text-red-600">
                        Your request has errors, make sure you have entered a
                        valid email
                    </p>
                );
                setLoading(false);
                return;
            }

            const updatedClassrooms = [...classrooms];
            const editedIndex = updatedClassrooms.findIndex(
                (classroom) => classroom.id === isEditing
            );
            updatedClassrooms[editedIndex] = classroom;
            setClassrooms(updatedClassrooms);

            setError("");
        } catch (error) {
            setError(<p className="text-red-600">Internal server error</p>);
            console.error(error);
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
                    <div className="w-1/3">
                        <div className="mt-3">
                            <label
                                htmlFor="name"
                                className="block mb-1 text-sm font-medium text-gray-900"
                            >
                                Name
                            </label>
                            <input
                                required
                                type="text"
                                id="name"
                                value={name}
                                onChange={handleNameChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Your classroom name"
                            />
                        </div>
                    </div>
                    <div className="w-1/3">
                        <div className="mt-3">
                            <label
                                htmlFor="professor-name"
                                className="block mb-1 text-sm font-medium text-gray-900"
                            >
                                Professor name
                            </label>
                            <input
                                required
                                type="text"
                                id="professor-name"
                                value={professorName}
                                onChange={handleProfessorNameChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Your professor name"
                            />
                        </div>
                    </div>
                    <div className="w-1/3">
                        <div className="mt-3">
                            <label
                                htmlFor="professor-email"
                                className="block mb-1 text-sm font-medium text-gray-900"
                            >
                                Professor email
                            </label>
                            <input
                                type="text"
                                id="professor-email"
                                value={professorEmail}
                                onChange={handleProfessorEmailChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Your professor name"
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
                    {isEditing ? "Edit" : "Submit"}
                </button>
            </form>

            <div className="relative overflow-x-auto border rounded-lg w-2/3 my-4">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Classroom name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Professor name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Professor email
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
                        {classrooms.map((classroom) => (
                            <tr
                                className="bg-white hover:bg-gray-50"
                                key={classroom.id}
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                    {classroom.name}
                                </th>
                                <td className="px-6 py-4">
                                    {classroom.professor_name}
                                </td>
                                <td className="px-6 py-4">
                                    {classroom.professor_email
                                        ? classroom.professor_email
                                        : "Not added"}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        className="font-medium text-blue-600 hover:underline"
                                        onClick={() =>
                                            handleEditClick(classroom.id)
                                        }
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        className="font-medium text-red-600 hover:underline"
                                        onClick={() =>
                                            handleDelete(classroom.id)
                                        }
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

export default HomeworkForm;
