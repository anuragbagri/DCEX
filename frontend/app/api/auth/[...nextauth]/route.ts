import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import prisma from "@/app/db";



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
            const userIn = prisma.user.findFirst({
                where : {
                    username : email
                }
            })

            if(userIn){
                return true
            }

            await prisma.user.create({
                data : {
                    username : email,
                    provider: "Github",
                    solWallet : {
                        create : {
                           publicKey : "",
                           privateKey : "",
                        }
                    },
                    inrWallet : {
                        create : {
                            balance : 0
                        }
                    }
                }
            })
        }
        return false
        }}
})
export { handler as GET, handler as POST };