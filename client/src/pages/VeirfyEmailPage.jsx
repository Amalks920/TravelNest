import VerifyEmailOrPhone from "../features/authentication/components/VerifyEmailOrPhone";


const VerifyEmailPage=({role,isOtpVerified})=>{

    return (
        <VerifyEmailOrPhone role={role} isOtpVerified={isOtpVerified}/>
    )
}


export default VerifyEmailPage;