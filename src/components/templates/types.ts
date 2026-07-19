export interface EventData {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  eventType: string;
  eventDate: string;
  eventTime: string;
  venueName: string;
  venueAddress: string;
  venueLatLng?: string | null;
  ceremonyName?: string | null;
  ceremonyAddress?: string | null;
  ceremonyLatLng?: string | null;
  ceremonyTime?: string | null;
  templateId: string;
  primaryColor: string;
  musicUrl?: string | null;
  phrase?: string | null;
  dressCode?: string | null;
  hashtag?: string | null;
  bankAlias?: string | null;
  bankCBU?: string | null;
  bankHolder?: string | null;
  rsvpEnabled: boolean;
  rsvpDeadline?: string | null;
  photos: { url: string; order: number }[];
}
