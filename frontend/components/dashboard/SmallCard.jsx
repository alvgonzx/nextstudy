const SmallCard = ({ tasks, classroom, professor }) => {
    return (
        <article className="border-[3.5px] border-[#D14141] p-3 w-40 rounded-xl">
            <div className="w-full flex justify-center mb-2">
                <span className="text-white text-[16px] font-semibold text-center bg-[#D14141] p-2 px-5 rounded-full">
                    {tasks} tasks
                </span>
            </div>
            <p className="font-bold">{classroom}</p>
            <p className="font-medium">{professor}</p>
        </article>
    );
};

export default SmallCard;
