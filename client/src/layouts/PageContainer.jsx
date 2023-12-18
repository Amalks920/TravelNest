
import { Outlet } from "react-router-dom"
import { NavbarDefault } from "./NavbarDefault"
import { Footer } from "./Footer"
import { Sidebar } from "./Sidebar"

const PageContainer = () => {

    // return (

    //     <div className="grid grid-cols-5 gap-4">
    //         <div className="border-2 col-span-full">
    //             <NavbarDefault />
    //         </div>

    //         <div className="border-2 border-black col-span-1 relative z-30">
    //             <Sidebar />
    //         </div>
    //         <div className="border-2 border-green-700 col-span-4 flex justify-center items-center">
    //             <Outlet />
    //         </div>

    //         <div className="border-2 col-span-full">
    //             <Footer />
    //         </div>
    //     </div>

    // )


    return (
        <div className="flex justify-center items-center w-[100vw] h-[100vh]">
            <Outlet />
        </div>

    )
}

export default PageContainer