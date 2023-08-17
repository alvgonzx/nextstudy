import Link from "next/link";
import Icon from "./Icon";

const links = [
    {
        label: "Dashboard",
        svg: "dashboard",
        route: "/dashboard",
    },
    {
        label: "Tasks",
        svg: "tasks",
        route: "/tasks",
    },
    {
        label: "Exams",
        svg: "exams",
        route: "/exams",
    },
    {
        label: "Classrooms",
        svg: "classrooms",
        route: "/classrooms",
    },
    {
        label: "Timer",
        svg: "timer",
        route: "/timer",
    },
    {
        label: "AI Homework",
        svg: "ai-homework",
        route: "/ai-homework",
    },
];

const Sidebar = () => {
    return (
        <aside className="border-r-2 border-[#AFAFAF] w-64 flex font-medium h-screen">
            <ul className="mt-3 ml-8">
                {links.map(({ label, svg, route }) => (
                    <li key={route} className="py-3 flex gap-7">
                        <Icon svg={svg} />
                        <Link href={route}>{label}</Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
