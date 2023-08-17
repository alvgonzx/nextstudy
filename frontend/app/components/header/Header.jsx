import Logo from "./Logo";
import Image from "next/image";

const Header = () => {
    return (
        <header className="w-full flex justify-between px-16 py-4 border-b-2 border-[#AFAFAF] font-semibold">
            <div className="flex flex-row items-center gap-3">
                <Logo />
                <h1>nextstudy</h1>
            </div>
            <Image src='/userlogo.png' width={50} height={50} alt="nextstudy-userlogo" />
        </header>
    );
};

export default Header;
