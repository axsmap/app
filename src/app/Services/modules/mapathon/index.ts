import { api } from "@/app//Services/api";
import venue from "./venue";
import event from "./event";
import oldEvents from "./oldEvents";
import eventDetails from "./eventDetails";
import mapathon from "./mapathon";
import createReview from "./review";
import review from "./venueOne";
import join from "./join";

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
  }),
  overrideExisting: false,
});

export const {
  useLazyVenueQuery,
  useCreateMapathonMutation,
  useEventQuery,
  useOldEventQuery,
  useEventDetailsQuery,
  useReviewQuery,
  useJoinMapathonMutation,
  useCreateReviewMutation,
} = allApi;
