import { NextRequest, NextResponse } from "next/server";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(lucia.sessionCookieName);

    if (sessionCookie) {
      await lucia.invalidateSession(sessionCookie.value);
    }

    const blankCookie = lucia.createBlankSessionCookie();
    cookieStore.set(
      blankCookie.name,
      blankCookie.value,
      blankCookie.attributes
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
