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
            <head>
                <link
                    rel="icon"
                    href="/images/favicon.svg"
                    type="image/svg+xml"
                    sizes="any"
                />
            </head>
            <body className={inter.className}>
                <div className="flex">
                    <Sidebar />
                    <main className="mt-6 ml-12 mr-8 w-full">{children}</main>
                </div>
            </body>
        </html>
    );
};

export default RootLayout;
