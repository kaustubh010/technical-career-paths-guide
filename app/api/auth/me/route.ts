import { NextRequest, NextResponse } from "next/server";
import { lucia } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(lucia.sessionCookieName);

    if (!sessionCookie) {
      return NextResponse.json({ user: null });
    }

    const session = await lucia.validateSession(sessionCookie.value);

    if (!session || !session.session || !session.session.userId) {
      return NextResponse.json({ user: null });
    }

    const userId = session.session.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture || null,
      },
    });
  } catch (error: any) {
    console.error("Auth Check Error:", error?.message);
    return NextResponse.json({ user: null });
  }
}
