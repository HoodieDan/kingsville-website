import type { WebsiteEvent } from "../utils/events";

// Website-managed promotions share the Prismic event shape used by both pages.
// All service times are in WAT (UTC+1).
export const outpourEvent = {
  id: "the-outpour-2026",
  primary: {
    event_name: "The Outpour 2026 — Blessed",
    short_description: [
      {
        type: "paragraph",
        text: "Join Kingsville Church for The Outpour 2026, themed Blessed, on Sundays, November 15 and 29. First service: 9:00–11:00 AM; second service: 6:00–8:00 PM on both days (WAT).",
        spans: [],
      },
      {
        type: "paragraph",
        text: "Hosted by Rev. Paul Rotua and Rev. Olusade Paul-Rotua, with guest ministers Rev. Gbade Ogunlana, Apst. Nnamdi Nnorom, and Rev. Bayo Oyekan. Venue: Kingsville Church, 2, Akinwunmi Street, off Hughes Avenue, Alagomeji, Yaba, Lagos (opposite LAWMA).",
        spans: [],
      },
    ],
    start_date_and_time: "2026-11-15T09:00:00+01:00",
    end_date_and_time: "2026-11-29T20:00:00+01:00",
    tags: [{ tag_name: "The Outpour" }, { tag_name: "Blessed" }],
    images: [{ image: {
      url: "/images/the-outpour-2026.jpg",
      alt: "The Outpour 2026 — Blessed. November 15 and 29 at Kingsville Church, Yaba, Lagos.",
    } }],
  },
  dateLabel: "Sundays, November 15 & 29, 2026",
  serviceLabel: "9:00–11:00 AM & 6:00–8:00 PM WAT on both days",
  location: "2, Akinwunmi Street, off Hughes Avenue, Alagomeji, Yaba, Lagos (opposite LAWMA)",
  detailsPath: "/outpour",
  sessions: [
    { label: "November 15 · First service", start: "2026-11-15T09:00:00+01:00", end: "2026-11-15T11:00:00+01:00" },
    { label: "November 15 · Second service", start: "2026-11-15T18:00:00+01:00", end: "2026-11-15T20:00:00+01:00" },
    { label: "November 29 · First service", start: "2026-11-29T09:00:00+01:00", end: "2026-11-29T11:00:00+01:00" },
    { label: "November 29 · Second service", start: "2026-11-29T18:00:00+01:00", end: "2026-11-29T20:00:00+01:00" },
  ],
  ministers: [
    { name: "Rev. Paul Rotua", role: "Host" },
    { name: "Rev. Olusade Paul-Rotua", role: "Host" },
    { name: "Rev. Gbade Ogunlana", role: "Guest minister" },
    { name: "Apst. Nnamdi Nnorom", role: "Guest minister" },
    { name: "Rev. Bayo Oyekan", role: "Guest minister" },
  ],
} satisfies WebsiteEvent;

export const websiteEvents: WebsiteEvent[] = [outpourEvent];
