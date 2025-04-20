import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import prisma from "@/app/db";
import { Keypair } from "@solana/web3.js"; 

 

const handler = NextAuth({
    providers : [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID ?? "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? ""
          })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
        if(account?.provider === 'github') {
            const email = user.email;
            if(!email){
                return false
            }
            const userIn =await prisma.user.findFirst({
                where : {
                    username : email
                }
            })

            if(userIn){
                return true
            }
            const keypair = Keypair.generate();
            const publickey = keypair.publicKey.toBase58();
            const privateKey = keypair.secretKey;

            console.log(publickey);
            console.log(privateKey);


            await prisma.user.create({
                data : {
                    username : email,
                    provider: "Github",
                    solWallet : {
                        create : {
                           publickey : publickey,
                           privateKey : privateKey.toString()
                        }
                    },
                    inrWallet : {
                        create : {
                            balance : 0
                        }
                    }
                }
            })
            return true
        }
        return false
        }}
})
export { handler as GET, handler as POST };