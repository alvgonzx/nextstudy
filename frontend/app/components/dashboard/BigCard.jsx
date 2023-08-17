const BigCard = ({ number, text }) => {
    return (
        <article className="border-[3.5px] border-[#D14141] p-3 pt-12 w-64 rounded-xl">
            <p className="font-bold text-4xl">{number}</p>
            <p className="font-medium">{text}</p>
        </article>
    );
};

export default BigCard;
