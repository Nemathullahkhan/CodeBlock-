import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try { 
    const id = params.id;

    const result = await prisma.content.findUnique({
      where: { id },
      include: { Questions: true },
    });

    if (!result) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 }); // Ensure JSON response
  } catch (error) {
    console.error("Error fetching content with questions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
