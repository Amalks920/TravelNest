import { Outlet } from "react-router-dom"


const AuthPageContainer=()=>{
    return (
<div className="flex justify-center items-center w-[100vw] h-[100vh]">
        <Outlet/>
</div>

    )
}

export default AuthPageContainer;