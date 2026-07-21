import { z } from "zod";

// ===== RSVP =====
export const rsvpSchema = z.object({
  eventSlug: z.string().min(1).max(200),
  guestName: z.string().min(1).max(100).trim(),
  guestCount: z.coerce.number().int().min(1).max(20),
  dietaryNotes: z.string().max(200).optional().nullable(),
  songRequest: z.string().max(200).optional().nullable(),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;

// ===== CREATE EVENT =====
export const createEventSchema = z.object({
  title: z.string().min(1).max(100).trim(),
  subtitle: z.string().max(200).optional().nullable(),
  eventType: z.enum(["boda", "15anos", "bautismo", "cumpleanos", "corporativo"]).default("boda"),
  eventDate: z.string().min(1), // ISO date string
  eventTime: z.string().min(1).max(10),
  venueName: z.string().min(1).max(150).trim(),
  venueAddress: z.string().min(1).max(300).trim(),
  venueLatLng: z.string().max(50).optional().nullable(),
  ceremonyName: z.string().max(150).optional().nullable(),
  ceremonyAddress: z.string().max(300).optional().nullable(),
  ceremonyLatLng: z.string().max(50).optional().nullable(),
  ceremonyTime: z.string().max(10).optional().nullable(),
  templateId: z.enum(["elegant-dark", "floral-light", "minimal-white", "rustic-kraft", "modern-gradient", "julia-xv", "noche-dorada", "camila-glam", "bautismo-tierno", "gala-corporativa"]).default("elegant-dark"),
  primaryColor: z.string().max(20).default("#d4af37"),
  musicUrl: z.string().url().max(500).optional().nullable(),
  phrase: z.string().max(500).optional().nullable(),
  dressCode: z.string().max(100).optional().nullable(),
  hashtag: z.string().max(50).optional().nullable(),
  bankAlias: z.string().max(50).optional().nullable(),
  bankCBU: z.string().max(30).optional().nullable(),
  bankHolder: z.string().max(100).optional().nullable(),
  rsvpEnabled: z.coerce.boolean().default(true),
  rsvpDeadline: z.string().max(50).optional().nullable(),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;

// ===== PAYMENT =====
export const createPaymentSchema = z.object({
  planId: z.enum(["BASICO", "PREMIUM", "PREMIUM_PLUS", "EXPRESS"]),
  buyerEmail: z.string().email().max(100).optional().default(""),
  buyerName: z.string().max(100).optional().default(""),
  buyerPhone: z.string().max(20).optional(),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;

// ===== LOGIN =====
export const loginSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().min(1).max(100),
});

export type LoginInput = z.infer<typeof loginSchema>;
