"use client";
import { useState } from "react";
import LoadingIcon from "../LoadingIcon";

const HomeworkForm = () => {
    const [name, setName] = useState("");
    const [professorName, setProfessorName] = useState("");
    const [professorEmail, setProfessorEmail] = useState("");
    const [classrooms, setClassrooms] = useState();
    
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    let icon = "";
    if (loading) {
        icon = <LoadingIcon />;
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

        let requestBody
        if (!professorEmail) {
            requestBody = {
                name: name,
                professor_name: professorName,
                professor_email: ''
            };
        } else {
            requestBody = {
                name: name,
                professor_name: professorName,
                professor_email: professorEmail ? professorEmail : ''
            };
        }

        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/classrooms/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const classroom = await response.json()

            if(classroom.errors) {
                setError(<p className="text-red-600">Your request has errors, make sure you have entered a valid email</p>)
                setLoading(false);
                return;
            }

            setClassrooms(classroom);
            setLoading(false);
            setError("");
        } catch (error) {
            setError(<p className="text-red-600">Internal server error</p>);
            setLoading(false);
            console.error(error);
        }
    };

    return (
        <>
            {error}
            <form onSubmit={handleSubmit}>
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
                    Submit
                </button>
            </form>
        </>
    );
};

export default HomeworkForm;
