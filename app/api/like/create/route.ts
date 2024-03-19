import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = auth();

        if (userId == null) {
            throw new Error("Un Authorized");
        }
        const requestBody = await req.json();

        const { postId, commentId } = requestBody;

        // Find the profile associated with the user ID
        const profile = await db.profile.findFirst({
            select: {
                id: true
            },
            where: { userId: userId },
        });

        if (!profile) {
            throw new Error("Profile not found");
        }

        let likeData;
        if (postId) {
            // If postId exists, it means the like is on a post
            likeData = {
                profile: { connect: { id: profile.id } },
                post: { connect: { id: postId } }
            };
        } else if (commentId) {
            // If commentId exists, it means the like is on a comment
            likeData = {
                profile: { connect: { id: profile.id } },
                comment: { connect: { id: commentId } }
            };
        } else {
            // Handle the case where neither postId nor commentId is provided
            throw new Error("Invalid like data. Please provide either postId or commentId.");
        }

        // Check if a like with the same profile ID and post/comment ID exists
        const existingLike = await db.like.findFirst({
            where: {
                profileId: profile.id,
                postId: postId,
                commentId: commentId
            }
        });

        if (existingLike) {
            // If an existing like is found, delete it
            await db.like.delete({
                where: {
                    id: existingLike.id
                }
            });
            return NextResponse.json({ data: 'Dislike' });
        } else {
            // Otherwise, create a new like
            const newLike = await db.like.create({
                data: likeData
            });
        }
        return NextResponse.json({ data: 'Like' });
    } catch (error) {
        console.log("[SUBSCRIPTION]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
