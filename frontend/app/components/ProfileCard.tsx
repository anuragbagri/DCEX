"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";

export const ProfileCard = ({publicKey} : {
    publicKey : string
}) => {
    const session = useSession();
    const Router = useRouter();
    // this session instance contains all the data about the logined in user.
    if(session.status === 'loading'){
        return (
            <div>
                loading...
            </div>
        )
    }
    if(!session.data?.user){
        Router.push("/")
        return null
    }
    return (
        <div className="pt-8 flex justify-center">
            <div className="max-w-4xl bg-white rounded shadow w-full p-12">
            <Greeting
            image={session.data?.user?.image ?? ""} 
            name={session.data?.user?.name ?? ""}
            />

            <Assets publicKey={publicKey}/>
            </div>
        </div>
    )
}

function Assets({publicKey} : {
   publicKey : string
})
{
    return (
        <div className="text-slate-500 mt-4">
            Accounts assets
        </div>
    )
}

function Greeting({image , name} : {
    image : string,
    name : string
}) {
   return  (
    <div className="flex">
        <img src={image} className="rounded-full w-14 h-14 mr-4"/>
        <div className="text-2xl font-bold flex-col justify-center">
        Welcome back, {name}
        </div>
    </div>
   )
}