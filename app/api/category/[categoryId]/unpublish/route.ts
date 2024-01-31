import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const category = await db.category.findUnique({
      where: {
        id: params.categoryId,
      }
    });

    if (!category) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedCategory = await db.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(deletedCategory);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const category = await db.category.findUnique({
      where: {
        id: params.categoryId,
      }
    });

    if (!category) {
      return new NextResponse("Not found", { status: 404 });
    }

    const publishedCategory = await db.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        isPublished: false,
      }
    });

    return NextResponse.json(publishedCategory);
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}