const HomeworkForm = () => {
    return (
        <form>
            <div className="flex gap-3 w-2/3">
                <div className="w-1/2">
                    <div className="mt-3">
                        <label
                            htmlFor="base-input"
                            className="block mb-1 text-sm font-medium text-gray-900"
                        >
                            Task
                        </label>
                        <input
                            type="text"
                            id="base-input"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Create an essay about..."
                        />
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="mt-3">
                        <label
                            htmlFor="countries"
                            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Writing style
                        </label>
                        <select
                            id="countries"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="highschool" selected>
                                High school student
                            </option>
                            <option value="middleschool">
                                Middle school student
                            </option>
                            <option value="university">
                                University student
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="mt-2 text-white bg-[#D14141] hover:bg-red-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
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
                rows="4"
                className="block p-2.5 w-2/3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                placeholder="Your homework will be here"
            ></textarea>
        </form>
    );
};

export default HomeworkForm;
