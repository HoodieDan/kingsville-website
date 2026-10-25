import type { RichTextField } from "@prismicio/client";

export interface WebsiteEvent {
  id: string;
  primary: {
    event_name: string | null;
    short_description: RichTextField;
    start_date_and_time: string | null;
    end_date_and_time: string | null;
    tags: { tag_name: string | null }[];
    images: { image: { url?: string | null; alt?: string | null } }[];
    registration_link?: { text?: string | null };
  };
  dateLabel?: string;
  serviceLabel?: string;
  location?: string;
  detailsPath?: string;
  sessions?: { label: string; start: string; end: string }[];
  ministers?: { name: string; role: string }[];
}

export function getEventTiming(event: WebsiteEvent, now: number) {
  const sessions = event.sessions?.length ? event.sessions : [{
    label: event.primary.event_name ?? "Event",
    start: event.primary.start_date_and_time ?? "",
    end: event.primary.end_date_and_time || event.primary.start_date_and_time || "",
  }];
  const session = [...sessions]
    .filter(session => Number.isFinite(Date.parse(session.start)) && Number.isFinite(Date.parse(session.end)))
    .sort((a, b) => Date.parse(a.start) - Date.parse(b.start))
    .find(session => Date.parse(session.end) > now);
  if (!session) return { status: "ended" as const, label: "Event has ended", remaining: 0 };
  const remaining = Math.max(0, Date.parse(session.start) - now);
  const sameDay = new Date(now).toLocaleDateString("en-GB", { timeZone: "Africa/Lagos" })
    === new Date(session.start).toLocaleDateString("en-GB", { timeZone: "Africa/Lagos" });
  return {
    status: remaining === 0 ? "started" as const : sameDay ? "today" as const : "upcoming" as const,
    label: session.label,
    remaining,
  };
}

export function getUpcomingEvents(events: WebsiteEvent[], now: number) {
  return events.filter(event => getEventTiming(event, now).status !== "ended")
    .sort((a, b) => Date.parse(a.primary.start_date_and_time ?? "") - Date.parse(b.primary.start_date_and_time ?? ""));
}

export function getFeaturedEvent(events: WebsiteEvent[], now: number) {
  const upcoming = getUpcomingEvents(events, now);
  // Website-managed promotions take precedence over the general CMS listing.
  return upcoming.find(event => event.detailsPath) ?? upcoming[0] ?? null;
}
