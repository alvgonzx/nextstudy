const AiHomeworkPage = () => {
    return (
        <>
            <p className="font-bold text-4xl">AI Homework</p>
            <form>
                <div className="flex w-full gap-3">
                    <div className="w-1/3">
                        <div class="mt-3">
                            <label
                                for="base-input"
                                class="block mb-1 text-sm font-medium text-gray-900"
                            >
                                Test
                            </label>
                            <input
                                type="text"
                                id="base-input"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            />
                        </div>
                    </div>
                    <div className="w-1/3">
                        <div class="mt-3">
                            <label
                                for="base-input"
                                class="block mb-1 text-sm font-medium text-gray-900"
                            >
                                Test
                            </label>
                            <input
                                type="text"
                                id="base-input"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            />
                        </div>
                    </div>
                </div>
                
                <button type="submit" class="mt-2 text-white bg-[#D14141] hover:bg-red-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>
        </>
    );
};

export default AiHomeworkPage;
