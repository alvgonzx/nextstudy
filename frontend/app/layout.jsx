import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "./components/sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "nextstudy",
    description: "Next generation open-source studying platform",
};

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex">
                    <Sidebar />
                    {children}
                </div>
            </body>
        </html>
    );
};

export default RootLayout;
