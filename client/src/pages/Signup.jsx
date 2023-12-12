import { useLocation } from "react-router-dom"
import SignupForm from "../features/authentication/components/SignupForm"


const Signup=()=>{
   const {pathname}= useLocation()
   console.log(pathname)
    return (
      
        <SignupForm role={pathname==='/signup'?'user':'owner'}/>

    )
}

export default Signup