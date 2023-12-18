import './App.css'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
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


function App() {



  const appRouter = createBrowserRouter([
    {
      element: <AuthPageContainer />,
      children: [
        {
          path: '/signup',
          element: <Signup />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/verify-email-or-phone',
          element: <VerifyEmailOrPhone />
        },
        {
          path: '/forgot-password',
          element: <ForgotPasswordForm />
        },
      ]
    },

    {
      element:<PageContainer/>,
      children:[
        {
          path:'/',
          element:<HotelRegistration/>
        }
      ]
    },

    {
      path: '/owner',
      element: <PageContainer />,
      children: [
        {
          path: '/owner/signup',
          element: <Signup />
        },
        {
          path:'/owner/hotel-registration',
          element:<HotelRegistration/>
        },
        {
          path:'/owner/users-list',
          element:<CustomersList/>
        },
        {
          path:'/owner/register-hotel',
          element:<HotelRegistration/>
        },
        {
          path:'/owner/register-room',
          element:<RoomRegistration/>
        },
        {
          path:'/owner/hotel-details',
          element:<HotelDetails/>
        }
      ]
    },
    {
      path: '/admin',
      element: <AuthPageContainer />,
      children: [
        {
          path: '/admin/login',
          element: <Login />
        }
      ]
    }

  ]);

  return (
    <RouterProvider router={appRouter}>

    </RouterProvider>
  )
}

export default App
