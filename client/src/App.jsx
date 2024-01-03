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
import HomePage from './pages/user/HomePage.jsx';
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
import RoomList from './features/hotelManagement/components/RoomList';
import HotelListPage from './pages/owner/HotelListPage';
import RequireAdminAuth from './features/authentication/components/RequireAdminAuth';
import { UsersList } from './features/userManagement/components/UsersList';
import DetailsPage from './pages/admin/DetailsPage.jsx';
import AdminHotelListPage from './pages/admin/AdminHotelListPage.jsx';
import SingleHotelPage from './pages/user/SingleHotelPage.jsx';
import VerifyEmailPage from './pages/VeirfyEmailPage.jsx';
import ResetPassword from './features/authentication/components/ResetPassword.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import HotelDetailsPage from './pages/owner/HotelDetailsPage.jsx';

function App() {
  const token = useSelector(selectToken)
  const role = useSelector(selectRole)



  return (
    <Routes>
    <Route path="/" element={<AuthPageContainer />}>

      <Route element={<CheckAuth currentRole={'user'}/>} >
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path='verify-email' element={<VerifyEmailPage  role={'user'} isOtpVerified={false}/>}></Route>
      <Route path='verify-otp/:email' element={<VerifyEmailPage role={'user'}  isOtpVerified={true}/>}></Route>
      <Route path='reset-password/:email' element={<ResetPasswordPage role={'user'}/>}></Route>


      </Route>

      {/* <Route
     // element={<AuthPageContainer home={true} />}
       element={<RequireUserAuth allowedRole={'user'} />}
       >
      <Route path="/home" element={<HomePage />} />
        <Route path="/hotel-details/:hotel_id" element={<SingleHotelPage/>} />
      </Route> */}


      <Route path='/owner' >
      <Route element={<CheckAuth currentRole={'owner'}/>} >
        <Route path="/owner/login" element={<Login />} />
        <Route path="/owner/signup" element={<Signup />} />
        <Route path='/owner/verify-email' element={<VerifyEmailPage  role={'owner'} isOtpVerified={false}/>}></Route>
      <Route path='/owner/verify-otp/:email' element={<VerifyEmailPage role={'owner'} isOtpVerified={true}/>}></Route>
      <Route path='/owner/reset-password/:email' element={<ResetPasswordPage role={'owner'}/>}></Route>
      </Route>

        <Route element={<RequireOwnerAuth allowedRole={'owner'} />}>
        <Route path="/owner/register-hotel" element={<HotelRegistration isEditForm={false} />} />
        <Route path="/owner/edit-hotel/:hotel_id" element={<HotelRegistration isEditForm={true} />} />
        <Route path="/owner/edit-room/:hotel_id/:_id" element={<RoomRegistration isEditForm={true} />} />
        <Route path='/owner/hotel-list' element={<HotelListPage/>}></Route>
        <Route path='/owner/room-list/:_id' element={<RoomList/>}></Route>
        <Route path="/owner/register-room/:hotel_id" element={<RoomRegistration isEditForm={false}/>} />
        <Route path='/owner/hotel-details/:hotel_id' element={<HotelDetailsPage/>}></Route>
      </Route>
       
      </Route>

      <Route path='/admin'>
        <Route element={<CheckAuth currentRole={'admin'}/>}>
          <Route path='/admin/login' element={<Login/>}></Route>
          <Route path='/admin/verify-email' element={<VerifyEmailPage role={'admin'} isOtpVerified={false}/>}></Route>
      <Route path='/admin/verify-otp/:email' element={<VerifyEmailPage role={'admin'}  isOtpVerified={true}/>}></Route>
      <Route path='/admin/reset-password/:email' element={<ResetPasswordPage role={'admin'}/>}></Route>
        </Route>

        <Route element={<RequireAdminAuth allowedRole={'admin'}/>}>
            <Route path='/admin/home' element={<UsersList/>}></Route>
            <Route path='/admin/hotel-details/:_id' element={<DetailsPage/>} > </Route>
            <Route path='/admin/hotel-list' element={<AdminHotelListPage/>} > </Route>
          </Route>
      </Route>
       
      </Route>


      <Route
     // element={<AuthPageContainer home={true} />}
       element={<PageContainer allowedRole={'user'} />}
       >
      <Route path="/home" element={<HomePage />} />
        <Route path="/hotel-details/:hotel_id" element={<SingleHotelPage/>} />
      </Route>
   
  </Routes>
  )
}

export default App
