import VerifyEmailOrPhone from "../features/authentication/components/VerifyEmailOrPhone";


const VerifyEmailPage=({isOtpVerified})=>{

    return (
        <VerifyEmailOrPhone isOtpVerified={isOtpVerified}/>
    )
}


export default VerifyEmailPage;