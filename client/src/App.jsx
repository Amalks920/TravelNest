import './App.css'
// import { Navigate, , redirect } from 'react-router-dom'
import { createBrowserRouter, redirect, Route, RouterProvider, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login';
import VerifyEmailOrPhone from './features/authentication/components/VerifyEmailOrPhone';
import AuthPageContainer from './layouts/AuthPageContainer';
import ForgotPasswordForm from './features/authentication/components/ForgotPasswordForm';
import PageContainer from './layouts/PageContainer';
import HotelRegistration from './pages/owner/HotelRegistration';
import CustomersList from './pages/owner/CustomersList';
import RoomRegistration from './pages/owner/RoomRegistration';
import HotelDetails from './pages/owner/HotelDetails';
import Home from './pages/user/Home';
import RequireUserAuth from './features/authentication/components/RequireUserAuth';
import PublicRoutes from './utils/routes/PublicRoutes';
import UserRoutes from './utils/routes/UserRoutes';
import OwnerRoutes from './utils/routes/OwnerRoutes';
import { checkAuth } from './utils/checkAuth';
import { useSelector } from 'react-redux';
import { selectRole, selectToken } from './features/authentication/services/loginSlice';
import path from 'path';
import RequireOwnerAuth from './features/authentication/components/RequireOwnerAuth';
import CheckAuth from './features/authentication/components/CheckAuth';
import HotelList from './features/hotelManagement/components/HotelList';

function App() {
  const token = useSelector(selectToken)
  const role = useSelector(selectRole)



  return (
    <Routes>
    <Route path="/" element={<AuthPageContainer />}>

      <Route element={<CheckAuth role={'user'}/>} >
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      </Route>

      <Route element={<RequireUserAuth allowedRole={'user'} />}>
        <Route path="/home" element={<Home />} />
      </Route>


      <Route path='/owner' >
      <Route element={<CheckAuth role={'owner'}/>} >
        <Route path="/owner/login" element={<Login />} />
        <Route path="/owner/signup" element={<Signup />} />
      </Route>

        <Route element={<RequireOwnerAuth allowedRole={'owner'} />}>
        <Route path="/owner/register-hotel" element={<HotelRegistration />} />
      </Route>
        <Route path="/owner/register-room" element={<RoomRegistration />} />
      </Route>
        <Route path='/owner/hotel-list' element={<HotelList/>}></Route>
      </Route>
   
  </Routes>
  )
}

export default App
