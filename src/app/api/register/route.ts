import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

// Utilidad para crear slugs a partir del título
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req as any);
    const { success } = await rateLimit(`register:${ip}`, { maxRequests: 5, windowMs: 60 * 60 * 1000 });
    
    if (!success) {
      return NextResponse.json({ error: "Demasiados intentos. Intenta más tarde." }, { status: 429 });
    }

    const body = await req.json();
    const { email, password, title, eventType, eventDate, eventTime, templateId } = body;

    if (!email || !password || !title || !eventDate || !templateId) {
      return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 });
    }

    // 1. Check if user exists
    let user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      return NextResponse.json({ error: "El email ya está registrado. Por favor inicia sesión." }, { status: 400 });
    }

    // 2. Hash password and create User
    const hashedPassword = await bcrypt.hash(password, 12);
    user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "CLIENT",
        plan: "BASICO",
      }
    });

    // 3. Create unique slug
    let baseSlug = createSlug(title);
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.event.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // 4. Create trial Event
    const event = await prisma.event.create({
      data: {
        slug,
        userId: user.id,
        title,
        eventType,
        eventDate: new Date(eventDate),
        eventTime: eventTime || "21:00",
        templateId,
        venueName: "Salón (A definir)",
        venueAddress: "Dirección (A definir)",
        isTrial: true,
        paymentStatus: "pending",
        rsvpEnabled: true,
      }
    });

    return NextResponse.json({ success: true, slug: event.slug });
  } catch (error) {
    console.error("Error registering:", error);
    return NextResponse.json({ error: "Error interno al crear tu cuenta" }, { status: 500 });
  }
}
