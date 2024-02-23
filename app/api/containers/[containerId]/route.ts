import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { useIsOwner } from "@/lib/owner";

export async function DELETE(
  req: Request,
  { params }: { params: { containerId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId || !useIsOwner(userId)) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

    const container = await db.container.findUnique({
      where: {
        id: params.containerId,
      }
    });

    if (!container) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedContainer = await db.container.delete({
      where: {
        id: params.containerId,
      },
    });

    return NextResponse.json(deletedContainer);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { containerId: string } }
) {
  try {
    const { userId } = auth();
    const { containerId } = params;
    const values = await req.json();

    if (!userId || !useIsOwner(userId)) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const container = await db.container.update({
      where: {
        id: containerId,
      },
      data: {
        ...values
      }
    });

    return NextResponse.json(container);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}