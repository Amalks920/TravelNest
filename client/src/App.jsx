import './App.css'
// import { Navigate, , redirect } from 'react-router-dom'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
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
import RequireAuth from './features/authentication/components/RequireAuth';
import PublicRoutes from './utils/routes/PublicRoutes';
import UserRoutes from './utils/routes/UserRoutes';
import OwnerRoutes from './utils/routes/OwnerRoutes';
import { checkAuth } from './utils/checkAuth';
import { useSelector } from 'react-redux';
import { selectRole, selectToken } from './features/authentication/services/loginSlice';

function App() {
  const token = useSelector(selectToken)
  const role = useSelector(selectRole)

  const appRouter = createBrowserRouter([
    {
      element: <AuthPageContainer />,
      children: [
        // { path: '/login', element: <Login />, },
        // { path: '/signup', element: <Signup /> },
        // { path: '/verify-email-or-password', element: <VerifyEmailOrPhone /> },
        // { path: '/forgot-password', element: <ForgotPasswordForm /> },
        ...PublicRoutes()

      ],
      loader: () => {
        if (token && role === 'user') {
          return redirect('/home')
        } else {
          return null
        }
      }
    },
    {
      element: <PageContainer />,
      children: [
       ...UserRoutes()
      ],
      loader: () => {
        if (!token && role!='user') {
          return redirect('/login')
        } else {
          return null
        }
      }
    },
    {
      element:<PageContainer/>,
      children:[
        ...OwnerRoutes()
      ],
      loader:()=>{
        if(!token && role!='owner'){
          return redirect('/owner/login')
        }else{
          return null
        }
      }

    },
    {
      path:'/admin',
      element:<PageContainer/>,
      children:[
        
      ]
    }
  ]);

  return (
    <RouterProvider router={appRouter}>

    </RouterProvider>
  )
}

export default App
