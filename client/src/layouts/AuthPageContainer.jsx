import { Navbar } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom"
import { selectToken } from "../features/authentication/services/loginSlice";
import PageContainer from "./PageContainer";
import { NavbarDefault } from "./NavbarDefault";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";


const AuthPageContainer = () => {
    const token = useSelector(selectToken)


    if (!token) {

        return (
            <div className="flex justify-center items-center w-[100vw] h-[100vh]">
                <Outlet />
            </div>
        )

    } else {

        return (
                
            <div className="grid grid-cols-5 gap-4">
                <div className="border-2 col-span-full">
                    <NavbarDefault />
                </div>

                <div className="border-2 border-black col-span-1 relative z-30">
                    <Sidebar />
                </div>
                <div className="border-2 border-green-700 col-span-4 flex justify-center items-center">
                    <Outlet />
                </div>

                <div className="border-2 col-span-full">
                    <Footer />
                </div>
            </div>

        )
    }
}

export default AuthPageContainer;