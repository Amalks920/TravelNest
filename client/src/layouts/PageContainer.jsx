
import { Outlet } from "react-router-dom"
import { NavbarDefault } from "./NavbarDefault"
import { Footer } from "./Footer"
import { Sidebar } from "./Sidebar"

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


    return (
        <div className="flex justify-center items-center w-[100vw] h-[100vh]">
            <Outlet />
        </div>

    )
}

export default PageContainer