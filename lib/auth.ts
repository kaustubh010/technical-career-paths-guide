import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "./prisma";
import { cookies } from "next/headers";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => ({
    id: attributes.id,
    googleId: attributes.googleId,
    name: attributes.name,
    email: attributes.email,
    picture: attributes.picture,
  }),
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      id: string;
      googleId: string | null;
      name: string | null;
      email: string;
      picture: string | null;
    };
  }
}

/**
 * Get current session and user from cookies
 * Used in API routes and server components for authentication
 */
export async function getCurrentSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(lucia.sessionCookieName);

  if (!sessionCookie) {
    return { user: null, session: null };
  }

  const result = await lucia.validateSession(sessionCookie.value);

  if (!result || !result.session || !result.session.userId) {
    return { user: null, session: null };
  }

  const user = await prisma.user.findUnique({
    where: { id: result.session.userId },
    select: {
      id: true,
      googleId: true,
      name: true,
      email: true,
      picture: true,
      createdAt: true,
    },
  });

  return { user, session: result.session };
}
