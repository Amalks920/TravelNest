import { Navbar } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom"
import { selectToken, store } from "../features/authentication/services/loginSlice";
import PageContainer from "./PageContainer";
import { NavbarDefault } from "./NavbarDefault";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";



const AuthPageContainer = () => {
    const token = useSelector(selectToken)
console.log(token)

    if (!token) {

        return (
            <div className="flex justify-center items-center w-[100vw] h-[100vh]">
                <Outlet />
            </div>
        )

    } else {

        return (
                
            // <div className="grid grid-cols-5 gap-4">
            //     <div className="border-2 col-span-full">
            //         <NavbarDefault />
            //     </div>

            //     <div className="md:hidden lg:flex col-span-1 relative z-30">
            //         <Sidebar />
            //     </div>
            //     <div className=" col-span-4 flex justify-center items-center">
            //         <Outlet />
            //     </div>

            //     <div className="border-2 col-span-full">
            //         <Footer />
            //     </div>
            // </div>

//             <>
//             <div className="container mx-auto">
//     <div className="flex flex-row flex-wrap py-4">
//         <aside className="w-full sm:w-1/3 md:w-1/4 px-2">
//             <div className="sticky top-0 p-4 w-full">
//                 <Navbar/>
//                 <ul className="flex flex-col overflow-hidden">
//                   <Sidebar/>
//                 </ul>
//             </div>
//         </aside>
//         <main role="main" className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
//            <Outlet/>
//         </main>
//     </div>
// </div>
// <footer className="mt-auto">
//    <Footer/>
// </footer>
// </>


// <div className="border-2 border-black grid grid-cols-4 gap-4 w-[100vw] min-h-[100vh] h-full">
//     <div className="border-2 border-red-600 col-span-4 fixed top-0 left-0 right-0 z-10"><NavbarDefault/></div>
//     <div className="border-2 border-red-600 col-span-1 fixed top-16 left-0 bottom-0 z-10"><Sidebar/></div>
//     <div className="border-2  border-red-600 col-span-3">
//             <Outlet/>
//     </div>
//     <div className="border-2 fixed  border-red-600 col-span-4">
//             <Footer/>
//     </div>
//     <div>
        
//     </div>
// </div>

<div className="grid grid-rows-[80px,auto,auto] grid-cols-[290px,80%] gap-2  min-h-screen">
    

<header className="col-span-3 row-span-1">
    <NavbarDefault/>
</header>


<nav class="lg:col-span-1 lg:row-span-2  hidden lg:block">
    <Sidebar/>
</nav>

<main className="lg:col-span-1 col-span-2 row-span-2 border-2">
<div className="flex justify-center items-center min-h-screen w-full max-w-[100vw]"><Outlet/></div>
</main>





<footer class="col-span-3 row-span-1  border-2 border-black">
    <Footer/>
</footer>

</div>



        )
    }
}

export default AuthPageContainer;