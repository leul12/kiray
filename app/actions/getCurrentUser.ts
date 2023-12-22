import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import  Prisma  from "@/app/libs/prsimadb";
export async function getSession(){
    return await getServerSession(authOptions);
}

export default async function getCurrentUser(){
    try{
        const session = await getSession();
        if(!session?.user?.email){
            return null;
        }
        const currentUser = await Prisma.user.findUnique({
            where:{
                email: session.user.email as string
            }
        });
        if (!currentUser){
            return null;
        }

        return currentUser;
    } catch (error: any){
        return null;
    }
}