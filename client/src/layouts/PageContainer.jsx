
import { Outlet } from "react-router-dom"
import { NavbarDefault } from "./NavbarDefault"
import { Footer } from "./Footer"
import { Sidebar } from "./Sidebar"

const PageContainer = () => {

    return (
        // <div className="grid grid-rows-3  gap-0">
        //     <div className="h-fit border-2 grid-span-12">
        //     <NavbarDefault />
        //     </div>
        //     <div className="h-fit">
        //     <Sidebar/>
        //     </div>
        //     <div className=" h-fit">
                
        //     </div>
        //     <div className=" h-fit">
        //     <Footer/>
        //     </div>
         
          
           
        // </div>

        <div className="grid grid-cols-5 gap-4">
            <div className="border-2 col-span-full">
            <NavbarDefault />
            </div>

            <div className="border-2 border-black col-span-1">
            <Sidebar/>
         </div>
        <div className="border-2 border-black col-span-4 flex justify-center items-center">
            <Outlet/>
         </div>

            <div className="border-2 col-span-full">
            <Footer/>
            </div>
        </div>

    )
}

export default PageContainer