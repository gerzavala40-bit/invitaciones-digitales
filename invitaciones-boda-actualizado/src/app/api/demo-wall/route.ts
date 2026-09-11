import { NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

// Global cache for the demo to avoid needing a DB just for the prototype
declare global {
  var demoPhotos: any[];
}
if (!global.demoPhotos) {
  global.demoPhotos = [];
}

export async function GET() {
  return NextResponse.json({ photos: global.demoPhotos });
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req as any);
    const { success } = await rateLimit(`upload:${ip}`, { maxRequests: 10, windowMs: 60000 });
    
    if (!success) {
      return NextResponse.json(
        { error: "Demasiadas subidas. Esperá un minuto." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { image, uploader } = body;
    
    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const newPhoto = {
      id: Date.now().toString(),
      image,
      uploader: uploader || "Invitado",
      timestamp: new Date().toISOString(),
    };

    global.demoPhotos.unshift(newPhoto);

    // Keep only last 50 photos for the demo to save memory
    if (global.demoPhotos.length > 50) {
      global.demoPhotos.pop();
    }

    return NextResponse.json({ success: true, photo: newPhoto });
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload" }, { status: 500 });
  }
}
