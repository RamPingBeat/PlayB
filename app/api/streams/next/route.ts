import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prismaClient } from "@/app/lib/db";
import { promise } from "zod";


export async function GET(){
    const session = await getServerSession();
    const user =await prismaClient.user.findFirst({
        where: {
             email: session?.user?.email ??""
        }
    });

    if(!user){
        return NextResponse.json({
            message: "Unauthenticated"
        }, {
            status: 403
        })
    }

    const mostUpvotedStream = await prismaClient.stream.findFirst({
        where: {
            userId: user.id,
            played:false
        },
        orderBy: {
            upvotes: {
                _count: 'desc'
            }
        }

    });
    await Promise.all([prismaClient.currentStream.upsert({
        where: {
            userId: user.id
        },
        update: {
            userId: user.id,
            streamId: mostUpvotedStream?.id
        },
        create: {
            userId: user.id,
            streamId: mostUpvotedStream?.id
        }
    }), prismaClient.stream.update({
        where: {
            id: mostUpvotedStream?.id ?? "",
         },
         data: {
            played: true,
            playedTs: new Date()
         }
    })])

    return NextResponse.json({
        stream: mostUpvotedStream
    })
}