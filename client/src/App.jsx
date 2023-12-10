import './App.css'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login';
import VerifyEmailOrPhone from './features/authentication/components/VerifyEmailOrPhone';
import AuthPageContainer from './layouts/AuthPageContainer';
import ForgotPasswordForm from './features/authentication/components/ForgotPasswordForm';

function App() {

  

 const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<AuthPageContainer/>,
    children:[
      {
        path:'/signup',
        element:<Signup/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/verify-email-or-phone',
      element:<VerifyEmailOrPhone/>
    },
    {
      path:'/forgot-password',
      element:<ForgotPasswordForm/>
    }
    ]
  },


]);
 
  return (
    <RouterProvider router={appRouter}>

    </RouterProvider>
  )
}

export default App
