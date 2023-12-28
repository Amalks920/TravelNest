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
import RoomList from './features/hotelManagement/components/RoomList';
import HotelListPage from './pages/owner/HotelListPage';
import RequireAdminAuth from './features/authentication/components/RequireAdminAuth';
import { UsersList } from './features/userManagement/components/UsersList';
import DetailsPage from './pages/admin/DetailsPage.jsx';
import AdminHotelListPage from './pages/admin/AdminHotelListPage.jsx';

function App() {
  const token = useSelector(selectToken)
  const role = useSelector(selectRole)



  return (
    <Routes>
    <Route path="/" element={<AuthPageContainer />}>

      <Route element={<CheckAuth currentRole={'user'}/>} >
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      </Route>

      <Route element={<RequireUserAuth allowedRole={'user'} />}>
        <Route path="/home" element={<Home />} />
      </Route>


      <Route path='/owner' >
      <Route element={<CheckAuth currentRole={'owner'}/>} >
        <Route path="/owner/login" element={<Login />} />
        <Route path="/owner/signup" element={<Signup />} />
      </Route>

        <Route element={<RequireOwnerAuth allowedRole={'owner'} />}>
        <Route path="/owner/register-hotel" element={<HotelRegistration isEditForm={false} />} />
        <Route path="/owner/edit-hotel/:hotel_id" element={<HotelRegistration isEditForm={true} />} />
        <Route path="/owner/edit-room/:room_id" element={<RoomRegistration isEditForm={true} />} />
        <Route path='/owner/hotel-list' element={<HotelListPage/>}></Route>
        <Route path='/owner/room-list/:_id' element={<RoomList/>}></Route>
        <Route path="/owner/register-room/:hotel_id" element={<RoomRegistration isEditForm={false}/>} />
      </Route>
       
      </Route>

      <Route path='/admin'>
        <Route element={<CheckAuth currentRole={'admin'}/>}>
          <Route path='/admin/login' element={<Login/>}></Route>
        </Route>

        <Route element={<RequireAdminAuth allowedRole={'admin'}/>}>
            <Route path='/admin/home' element={<UsersList/>}></Route>
            <Route path='/admin/hotel-details/:_id' element={<DetailsPage/>} > </Route>
            <Route path='/admin/hotel-list' element={<AdminHotelListPage/>} > </Route>
          </Route>
      </Route>
       
      </Route>
   
  </Routes>
  )
}

export default App
