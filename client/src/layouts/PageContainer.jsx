
import { Outlet } from "react-router-dom"
import { NavbarDefault } from "./NavbarDefault"
import { Footer } from "./Footer"
import { Sidebar } from "./Sidebar"
import { useSelector } from "react-redux"
import { selectToken } from "../features/authentication/services/loginSlice"

const PageContainer = () => {

    return (

        <div className="grid grid-cols-12">
            <div className=" col-span-full">
                <NavbarDefault />
            </div>

            <div className=" w-fit col-span-2 relative z-30 ">
                <Sidebar />
            </div>
            <div className="col-span-10  flex justify-center items-center">
                <Outlet />
            </div>

            <div className="border-2 col-span-full">
                <Footer />
            </div>
        </div>

    )



}

export default PageContainer