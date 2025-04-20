"use client"
import { signIn, useSession } from "next-auth/react"
import { SecondaryButton } from "./Button"
import { useRouter } from "next/navigation";

export const  Hero = () => {
  const session = useSession();
  const router = useRouter();

 return (
    <div>
        <div className="text-5xl font-medium">
          <span>
            The Indian CryptoCurrency
          </span>

          <span className="text-blue-500 pl-3">
            Revolution
          </span>
        </div>
        <div className="flex justify-center pt-2 text-xl text-slate-500">
            Create a frictionless wallet from India with just a Google Accounts.
        </div>
        <div className="flex justify-center pt-1 text-xl text-slate-500">
        convert your INR into CryptoCurrency
        </div>
        <div className="pt-5 flex justify-center">
            {session.data?.user? <SecondaryButton onClick={()=> {
                router.push("/dashboard");
            }}>go to dashboard</SecondaryButton> :
            
            <SecondaryButton onClick={()=> {
              signIn("github");
          }}>Login with Github</SecondaryButton>}
        </div>
    </div>
 )
}