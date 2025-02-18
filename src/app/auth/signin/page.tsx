import SignInForm from "@/app/components/SignInForm"
import Link from "next/link"

interface Props {
    searchParams: {
        callbackUrl?: string;
    }
}

const SignInPage = ({searchParams}:Props) => {
    console.log(searchParams);
  return (
    <div className="flex items-center justify-center flex-col">

    <SignInForm callbackUrl={searchParams.callbackUrl}/>
    <Link href={"/auth/forgotPass"}>Forgot Your Password?</Link>
    </div>
          )
}

export default SignInPage