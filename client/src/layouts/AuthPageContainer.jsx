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