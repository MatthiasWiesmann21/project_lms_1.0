import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
) {
// POST /api/subscribe
  try {
    const { userId } = auth();
    const requestBody = await req.json();
    const { name, email, message } = requestBody;
    

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const subscription = await db.newsletterSubscription.create({
      data: {
        userId,
        name,
        email,
        message,
      },
    });
    return NextResponse.json(subscription);
  } catch (error) {
    console.log("[SUBSCRIPTION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
