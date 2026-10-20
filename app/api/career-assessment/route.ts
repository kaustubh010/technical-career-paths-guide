import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/auth";
import { z } from "zod";

const assessmentSchema = z.object({
  name: z.string().optional().nullable(),
  skills: z.array(z.string()).default([]),
  interests: z.array(z.string()).default([]),
  recommendedPathId: z.string().min(1, "Recommended path ID is required"),
  recommendedPathTitle: z.string().min(1, "Recommended path title is required"),
  reason: z.string().optional().nullable(),
  matchedItems: z.array(z.string()).default([]),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = assessmentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input data" },
        { status: 400 }
      );
    }

    const { user } = await getCurrentSession();
    const data = parsed.data;

    const assessment = await prisma.careerAssessment.create({
      data: {
        userId: user?.id || null,
        name: data.name || null,
        skills: data.skills,
        interests: data.interests,
        recommendedPathId: data.recommendedPathId,
        recommendedPathTitle: data.recommendedPathTitle,
        reason: data.reason || null,
        matchedItems: data.matchedItems,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Career assessment saved successfully",
        assessment,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Save Career Assessment Error:", error);
    return NextResponse.json(
      { error: "Failed to save career assessment data", details: error?.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { user } = await getCurrentSession();

    if (!user) {
      return NextResponse.json({ assessments: [] });
    }

    const assessments = await prisma.careerAssessment.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      assessments,
    });
  } catch (error: any) {
    console.error("Fetch Career Assessments Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch assessments" },
      { status: 500 }
    );
  }
}
