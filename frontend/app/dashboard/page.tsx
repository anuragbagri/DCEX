import { getServerSession } from "next-auth";
import { ProfileCard } from "../components/ProfileCard";
import prisma from "../db";
import { authConfig } from "../lib/auth";


async function getUserWallet(){
    const session = await getServerSession(authConfig);

    const userWallet = await prisma.solWallet.findFirst({
        where : {
            userId: session?.user?.uid
        },
        select : {
            publickey : true
        }
    })

    if(!userWallet){
        return {
            error : "no solana wallet found assocaited to the user"
    }
    }
    return {error : null , userWallet};
}


export default async function(){
    const userWallet = await getUserWallet();

    if(userWallet.error || !userWallet.userWallet?.publickey){
        return <>no solana wallet found</>
    }
    return (
        <div>
            <ProfileCard publicKey={userWallet.userWallet?.publickey}/>
        </div>
    )
}