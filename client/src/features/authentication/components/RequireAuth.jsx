import { useSelector } from "react-redux";
import { selectRole, selectToken } from "../services/loginSlice";
import { Outlet, useNavigate } from "react-router";

const RequireAuth=()=>{
    const navigate=useNavigate()
    const token=useSelector(selectToken)
    const role=useSelector(selectRole)
    console.log(token)
    return (
        token?<Outlet/>:navigate('/login')
    )
}

export default RequireAuth;