import venue from "./venue";
import event from "./event";
import oldEvents from "./oldEvents";
import eventDetails from "./eventDetails";
import mapathon from "./mapathon";
import createReview from "./review";
import review from "./venueOne";
import join from "./join";
import placeDetails from "./placeDetails";
import location from "./location";
import { api } from "@/Services/api";

export const allApi = api.injectEndpoints({
  endpoints: (build) => ({
    venue: venue(build),
    event: event(build),
    oldEvent: oldEvents(build),
    eventDetails: eventDetails(build),
    createMapathon: mapathon(build),
    createReview: createReview(build),
    review: review(build),
    joinMapathon: join(build),
    location: location(build),
    placeDetails: placeDetails(build),
  }),
  overrideExisting: false,
});

export const {
  useLazyVenueQuery,
  useCreateMapathonMutation,
  useEventQuery,
  useLazyEventQuery,
  useLazyOldEventQuery,
  useOldEventQuery,
  useEventDetailsQuery,
  useReviewQuery,
  useJoinMapathonMutation,
  useCreateReviewMutation,
  useLazyLocationQuery,
  useLazyPlaceDetailsQuery,
} = allApi;
