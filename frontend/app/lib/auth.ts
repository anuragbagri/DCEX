import GithubProvider from "next-auth/providers/github";
import prisma from "@/app/db";
import { Keypair } from "@solana/web3.js"; 
import { Session } from "next-auth";

export interface CustomSession extends Session {
    user: {
        email: string,
        name: string,
        image: string,
        uid: string
    };
}

export const authConfig = {
    secret : process.env.NEXTAUTH_SECRET || 'secret',
    session: {
        strategy: "jwt",
      },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID ?? "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? ""
        })
    ],
    callbacks: {
        session: ({ session, token }: any): CustomSession => {
            const newSession = session as CustomSession;
            if (newSession.user && token.uid) {
                newSession.user = {
                    ...newSession.user,
                    uid: token.uid ?? ""
                };
            }
            return newSession;
        },
        async jwt({ token, account }: any) {
            if (account?.providerAccountId) {
                const user = await prisma.user.findFirst({
                    where: {
                        sub: account?.providerAccountId
                    }
                });
                if (user) {
                    token.uid = user.id;
                }
            }
            return token;
        },
        async signIn({ user, account, profile ,email, credentials } : any) {
            if (account?.provider === 'github') {
                const userEmail = user.email;
                if (!userEmail) return false;

                const existingUser = await prisma.user.findFirst({
                    where: { username: userEmail }
                });

                if (existingUser) return true;

                const keypair = Keypair.generate();
                const publickey = keypair.publicKey.toBase58();
                const privateKey = Buffer.from(keypair.secretKey).toString('base64');

                await prisma.user.create({
                    data: {
                        username: userEmail,
                        name: profile?.name,
                        profilePicture: profile?.picture,
                        provider: "Github",
                        sub: account.providerAccountId,
                        solWallet: {
                            create: {
                                publickey : publickey,
                                privateKey : privateKey
                            }
                        },
                        inrWallet: {
                            create: {
                                balance: 0
                            }
                        }
                    }
                });
                return true;
            }
            return false;
        }
    }
};
