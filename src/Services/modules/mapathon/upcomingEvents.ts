// Shared event types. Originally co-located with the (now removed)
// upcomingEventsQuery — kept here because event.ts, oldEvents.ts, and
// mapathons/page.tsx all import these types from this path.
export type EventType = {
  id: string;
  name: string;
  location: { coordinates: [number, number] };
  startDate: string;
  endDate: string;
  mapUrl: string;
  reviewCount: number;
  reviewsGoal: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  reviewsAmount: number;
  mapathonId: string;
  eventId: string;
  eventName: string;
  eventLocation: string;
  address: string;
  status?: "draft" | "active" | "closed";
};

export type EventResponse = {
  results: EventType[];
  total: number;
};
