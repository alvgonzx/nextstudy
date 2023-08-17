import BigCard from "./components/dashboard/BigCard";
import SmallCard from "./components/dashboard/SmallCard";

const HomePage = () => {
    return (
        <main className="mt-12 ml-12 w-full">
            <p className="font-bold text-4xl">Welcome back, Álvaro</p>
            <section className="mt-5 flex gap-6">
                <BigCard number={4} text="Tasks remaining" />
                <BigCard number={2} text="Exams this week" />
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
        </main>
    );
};

export default HomePage;
