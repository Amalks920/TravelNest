import React from 'react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useGoogleSignInMutation } from '../services/googleAuthApiSlice';

const GoogleAuth = ({role}) => {
const clientId = 'Enter your client Id';

const [googleSignin,{isError,isLoading,isSuccess,isUninitialized}]=useGoogleSignInMutation()

return (
   
<GoogleOAuthProvider clientId={'645023873338-gn2npci9erdpl5hvs9fsuuh6pa6v1grm.apps.googleusercontent.com'}>
<GoogleLogin
onSuccess={async credentialResponse => {

    await googleSignin({credentialResponse,role})

console.log(credentialResponse);
}}
onError={() => {
console.log('Login Failed');
}}
/>
</GoogleOAuthProvider>
);
};

export default GoogleAuth;