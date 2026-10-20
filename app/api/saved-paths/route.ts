import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/auth";
import { z } from "zod";

const savePathSchema = z.object({
  pathId: z.string().min(1, "Path ID is required"),
  status: z.enum(["exploring", "learning", "target"]).default("exploring"),
  notes: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const { user } = await getCurrentSession();

    if (!user) {
      return NextResponse.json(
        { error: "You must be signed in to save career paths." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsed = savePathSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid request data" },
        { status: 400 }
      );
    }

    const { pathId, status, notes } = parsed.data;

    const saved = await prisma.savedCareerPath.upsert({
      where: {
        userId_pathId: {
          userId: user.id,
          pathId,
        },
      },
      update: {
        status,
        notes: notes || undefined,
      },
      create: {
        userId: user.id,
        pathId,
        status,
        notes: notes || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Career path saved successfully",
      savedPath: saved,
    });
  } catch (error: any) {
    console.error("Save Path Error:", error);
    return NextResponse.json(
      { error: "Failed to save path", details: error?.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { user } = await getCurrentSession();

    if (!user) {
      return NextResponse.json({ savedPaths: [] });
    }

    const savedPaths = await prisma.savedCareerPath.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      savedPaths,
    });
  } catch (error: any) {
    console.error("Fetch Saved Paths Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch saved paths" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { user } = await getCurrentSession();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const pathId = url.searchParams.get("pathId");

    if (!pathId) {
      return NextResponse.json(
        { error: "pathId parameter is required" },
        { status: 400 }
      );
    }

    await prisma.savedCareerPath.deleteMany({
      where: {
        userId: user.id,
        pathId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Path unsaved successfully",
    });
  } catch (error: any) {
    console.error("Delete Saved Path Error:", error);
    return NextResponse.json(
      { error: "Failed to remove path" },
      { status: 500 }
    );
  }
}
