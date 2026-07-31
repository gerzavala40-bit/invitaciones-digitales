import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getClientSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("client_session")?.value;

  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "dev-secret");
    const { payload } = await jwtVerify(token, secret);
    return payload as { userId: string; role: string };
  } catch (error) {
    return null;
  }
}
